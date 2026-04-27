"""
Daily bot learning progress update script.

Runs once per day (triggered by the GitHub Actions workflow).
For every bot JSON file in this directory:
  - If the bot is still learning (is_learning=True) and has not been updated
    today, advance its progress_percentage by a small random amount.
  - The effective learning cap is determined in this priority order:
      1. doctor_learning_goal  (e.g. 300 for library bots earning a doctorate)
      2. master_learning_goal  (e.g. 200 for master-level learning)
      3. progress_target       (explicit target field)
      4. 100                   (default)
  - When a bot has already reached its effective cap, a "maintaining peak
    learning" log entry is still written so progress is always visible.
  - Appends a dated entry to learning_log and updates last_reported_date.
"""

import json
import pathlib
import random
from datetime import date

BOTS_DIR = pathlib.Path(__file__).parent
TODAY = date.today().isoformat()


def load_json(path: pathlib.Path) -> dict:
    return json.loads(path.read_text(encoding="utf-8"))


def save_json(path: pathlib.Path, data: dict) -> None:
    path.write_text(json.dumps(data, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")


def effective_cap(bot: dict) -> int:
    """Return the highest learning cap this bot can reach."""
    for field in ("doctor_learning_goal", "master_learning_goal", "progress_target"):
        val = bot.get(field)
        if isinstance(val, (int, float)) and val > 0:
            return int(val)
    return 100


def should_update(bot: dict) -> bool:
    """Return True if this bot should receive a progress entry today."""
    if not bot.get("is_learning", True):
        return False
    if bot.get("last_reported_date") == TODAY:
        return False
    return True


def advance_progress(bot: dict) -> dict:
    """Advance progress toward the effective cap and add a log entry."""
    current = bot.get("progress_percentage", 0)
    if not isinstance(current, (int, float)):
        current = 0

    cap = effective_cap(bot)

    if current >= cap:
        # Bot is already at or beyond its cap — log maintaining peak learning.
        bot["last_reported_date"] = TODAY
        log_entry = {
            "date": TODAY,
            "entry": f"Maintaining peak learning at {current}% (cap: {cap}%). Daily activity logged.",
        }
    else:
        increment = random.randint(2, 4)
        new_progress = min(current + increment, cap)
        bot["progress_percentage"] = new_progress
        bot["last_reported_date"] = TODAY
        log_entry = {
            "date": TODAY,
            "entry": f"Daily learning update. Progress advanced from {current}% to {new_progress}% (cap: {cap}%).",
        }

    if "learning_log" not in bot or not isinstance(bot["learning_log"], list):
        bot["learning_log"] = []

    bot["learning_log"].append(log_entry)
    return bot


def main() -> None:
    bot_files = sorted(BOTS_DIR.glob("bot_*.json"))
    updated = 0
    skipped = 0
    errors = 0

    for path in bot_files:
        try:
            bot = load_json(path)
        except (json.JSONDecodeError, OSError) as exc:
            print(f"ERROR: Could not read/parse {path.name}: {exc}")
            errors += 1
            continue

        if not should_update(bot):
            skipped += 1
            continue

        try:
            bot = advance_progress(bot)
            save_json(path, bot)
        except (OSError, TypeError, ValueError) as exc:
            print(f"ERROR: Could not update {path.name}: {exc}")
            errors += 1
            continue

        updated += 1
        pct = bot.get("progress_percentage", "?")
        cap = effective_cap(bot)
        print(f"Updated {path.name} → {pct}% (cap: {cap}%)")

    print(
        f"\nDone. Updated: {updated}  |  Skipped (up-to-date): {skipped}  |  Errors: {errors}"
    )
    if errors:
        raise SystemExit(1)


if __name__ == "__main__":
    main()
