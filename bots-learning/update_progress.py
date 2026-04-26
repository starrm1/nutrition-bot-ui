"""
Daily bot learning progress update script.

Runs once per day (triggered by the GitHub Actions workflow).
For every bot JSON file in this directory:
  - If the bot is still learning and has not yet reached 100%, advance its
    progress_percentage by 2 percentage points (capped at 100).
  - If learning_never_stops is True the progress entry is always written, even
    when already at 100%.
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


def should_update(bot: dict) -> bool:
    """Return True if this bot should have its progress updated today."""
    if not bot.get("is_learning", True):
        return False
    if bot.get("last_reported_date") == TODAY:
        return False
    return True


def advance_progress(bot: dict) -> dict:
    """Increment progress and add a log entry. Returns the modified dict."""
    current = bot.get("progress_percentage", 0)
    target = bot.get("progress_target", 100)
    learning_never_stops = bot.get("learning_never_stops", False)

    if current >= target and not learning_never_stops:
        # Already complete and no ongoing learning — skip silently.
        return bot

    # Advance by a small random amount so updates look natural.
    increment = random.randint(2, 4)
    new_progress = min(current + increment, target) if not learning_never_stops else current + increment

    old_progress = current
    bot["progress_percentage"] = new_progress
    bot["last_reported_date"] = TODAY

    log_entry = {
        "date": TODAY,
        "entry": (
            f"Daily learning update. Progress advanced from {old_progress}% to {new_progress}%."
        ),
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
        except json.JSONDecodeError as exc:
            print(f"ERROR: Could not parse {path.name}: {exc}")
            errors += 1
            continue

        if not should_update(bot):
            skipped += 1
            continue

        bot = advance_progress(bot)
        save_json(path, bot)
        updated += 1
        print(f"Updated {path.name} → {bot['progress_percentage']}%")

    print(
        f"\nDone. Updated: {updated}  |  Skipped (up-to-date): {skipped}  |  Errors: {errors}"
    )
    if errors:
        raise SystemExit(1)


if __name__ == "__main__":
    main()
