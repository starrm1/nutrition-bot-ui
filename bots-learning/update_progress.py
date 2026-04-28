"""
Daily bot learning progress update script.

Runs once per day (triggered by the GitHub Actions workflow).
For every bot_*.json file in this directory:
  - If the bot is still learning (is_learning=True, or field absent) and has
    not been updated today, advance its progress_percentage by a small random
    amount toward its effective cap.
  - The effective learning cap is determined in this priority order:
      1. doctor_learning_goal  (e.g. 300 for library bots earning a doctorate)
      2. master_learning_goal  (e.g. 200 for master-level learning)
      3. progress_target       (explicit per-bot target field)
      4. 100                   (universal default)
  - When a bot has already reached its effective cap, a "maintaining peak
    learning" log entry is written so daily activity is always visible.
  - All file writes are atomic: data is written to a temp file first, then
    renamed into place, so a partial write never corrupts a bot file.
  - Exits with code 1 if any file could not be read or written.
"""

from __future__ import annotations

import json
import pathlib
import random
import sys
from datetime import date

# ---------------------------------------------------------------------------
# Module-level constants
# ---------------------------------------------------------------------------

# Directory that contains all bot_*.json files (same folder as this script)
BOTS_DIR: pathlib.Path = pathlib.Path(__file__).parent

# Minimum and maximum learning percentage-points added per daily update
DAILY_INCREMENT_MIN: int = 2
DAILY_INCREMENT_MAX: int = 4


# ---------------------------------------------------------------------------
# Pure helpers
# ---------------------------------------------------------------------------

def today_iso() -> str:
    """Return today's date as an ISO-8601 string (YYYY-MM-DD) using local time."""
    return date.today().isoformat()


def effective_cap(bot: dict) -> int:
    """Return the highest learning percentage this bot should progress toward.

    Priority order (first field found with a positive numeric value wins):
      1. doctor_learning_goal  – doctorate track (e.g. 300)
      2. master_learning_goal  – master track    (e.g. 200)
      3. progress_target       – explicit target set on individual bot
      4. 100                   – universal fallback default
    """
    for field in ("doctor_learning_goal", "master_learning_goal", "progress_target"):
        val = bot.get(field)
        if isinstance(val, (int, float)) and val > 0:
            return int(val)
    return 100


def should_update(bot: dict, today: str) -> bool:
    """Return True when this bot should receive a progress entry today.

    A bot is skipped when:
      - ``is_learning`` is explicitly set to ``False`` (absent → treated as True), or
      - ``last_reported_date`` already equals *today* (already updated this run).
    """
    if not bot.get("is_learning", True):
        return False
    if bot.get("last_reported_date") == today:
        return False
    return True


def advance_progress(bot: dict, today: str) -> dict:
    """Mutate *bot* in-place, advancing progress and appending a log entry.

    - Clamps ``progress_percentage`` to the range [0, cap].
    - Treats any non-numeric or negative stored value as 0.
    - Always sets ``last_reported_date`` so the bot is not processed twice
      on the same calendar day.

    Returns the mutated *bot* dict.
    """
    # --- Safely read and normalise current progress --------------------------
    raw = bot.get("progress_percentage", 0)
    try:
        current: float = max(0.0, float(raw))
    except (TypeError, ValueError):
        current = 0.0

    cap: int = effective_cap(bot)

    # --- Decide whether to advance or maintain -------------------------------
    if current >= cap:
        # Already at or beyond cap — record maintenance only; do not increment.
        log_entry = {
            "date": today,
            "entry": (
                f"Maintaining peak learning at {current:g}% "
                f"(cap: {cap}%). Daily activity logged."
            ),
        }
    else:
        increment: int = random.randint(DAILY_INCREMENT_MIN, DAILY_INCREMENT_MAX)
        new_progress: float = min(current + increment, float(cap))
        bot["progress_percentage"] = new_progress
        log_entry = {
            "date": today,
            "entry": (
                f"Daily learning update. Progress advanced from "
                f"{current:g}% to {new_progress:g}% (cap: {cap}%)."
            ),
        }

    # --- Always stamp today's date -------------------------------------------
    bot["last_reported_date"] = today

    # --- Guarantee learning_log is a list before appending -------------------
    if not isinstance(bot.get("learning_log"), list):
        bot["learning_log"] = []
    bot["learning_log"].append(log_entry)

    return bot


# ---------------------------------------------------------------------------
# I/O helpers
# ---------------------------------------------------------------------------

def load_json(path: pathlib.Path) -> dict:
    """Read *path* and return its parsed JSON content.

    Raises:
        OSError: if the file cannot be opened or read.
        json.JSONDecodeError: if the content is not valid JSON.
    """
    return json.loads(path.read_text(encoding="utf-8"))


def save_json(path: pathlib.Path, data: dict) -> None:
    """Write *data* to *path* atomically.

    Data is serialised to a sibling ``.tmp`` file and then renamed into
    place.  This prevents a partial write from corrupting an existing bot
    file if the process is interrupted mid-write.

    Raises:
        OSError: on any filesystem error; the temp file is removed on failure.
    """
    tmp = path.with_suffix(".tmp")
    try:
        tmp.write_text(
            json.dumps(data, indent=2, ensure_ascii=False) + "\n",
            encoding="utf-8",
        )
        tmp.replace(path)          # atomic rename on POSIX; best-effort on Windows
    except OSError:
        tmp.unlink(missing_ok=True)  # clean up orphaned temp file
        raise


# ---------------------------------------------------------------------------
# Entry point
# ---------------------------------------------------------------------------

def main() -> None:
    today: str = today_iso()
    # Collect all bot_*.json files plus any named standalone bot JSON files
    # (e.g. nutrigenomics.json which does not follow the bot_* naming convention).
    _standalone = [BOTS_DIR / "nutrigenomics.json"]
    bot_files = sorted(
        set(BOTS_DIR.glob("bot_*.json")) | {p for p in _standalone if p.exists()}
    )

    if not bot_files:
        print(
            f"WARNING: No bot_*.json files found in {BOTS_DIR}",
            file=sys.stderr,
        )
        return

    updated: int = 0
    skipped: int = 0
    errors: int = 0

    for path in bot_files:
        # --- Load -----------------------------------------------------------
        try:
            bot = load_json(path)
        except (json.JSONDecodeError, OSError) as exc:
            print(f"ERROR: Could not read/parse {path.name}: {exc}", file=sys.stderr)
            errors += 1
            continue

        # Guard: every bot file must be a JSON object, not an array or scalar.
        if not isinstance(bot, dict):
            print(
                f"ERROR: {path.name} root value is {type(bot).__name__}, expected object.",
                file=sys.stderr,
            )
            errors += 1
            continue

        # --- Check whether an update is needed today ------------------------
        if not should_update(bot, today):
            skipped += 1
            continue

        # --- Advance & persist ----------------------------------------------
        try:
            bot = advance_progress(bot, today)
            save_json(path, bot)
        except (OSError, TypeError, ValueError) as exc:
            print(f"ERROR: Could not update {path.name}: {exc}", file=sys.stderr)
            errors += 1
            continue

        updated += 1
        pct = bot.get("progress_percentage", "?")
        cap = effective_cap(bot)
        print(f"Updated {path.name} → {pct}% (cap: {cap}%)")

    # --- Summary ------------------------------------------------------------
    print(
        f"\nDone. Updated: {updated}  |  "
        f"Skipped (up-to-date): {skipped}  |  "
        f"Errors: {errors}"
    )
    if errors:
        sys.exit(1)


if __name__ == "__main__":
    main()
