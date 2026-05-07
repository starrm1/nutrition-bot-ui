#!/usr/bin/env python3
"""
Daily bot progress updater.
Increments each bot's progress_percentage, updates last_reported_date,
adds a learning log entry, and transitions status to advanced_learning at 75%.
"""

import json
import os
import random
from datetime import date

BOTS_DIR = os.path.join(os.path.dirname(__file__))
TODAY = date.today().isoformat()

STATUS_INDEPENDENT = "independent_learning"
STATUS_ADVANCED = "advanced_learning"
STATUS_COMPLETE = "learning_complete"

THRESHOLD_ADVANCED = 75
THRESHOLD_COMPLETE = 100

# Daily progress increment range (percent)
MIN_DAILY_INCREMENT = 2
MAX_DAILY_INCREMENT = 5

ADVANCED_LOG_ENTRY = (
    "Transitioned to advanced_learning phase after reaching 75% progress. "
    "Notifying Copilot and requesting expanded learning topics."
)
COMPLETE_LOG_ENTRY = (
    "Learning goal reached at 100%. Bot has completed its learning curriculum "
    "and is ready for deployment."
)


def update_bot(filepath: str) -> bool:
    """Update a single bot JSON file. Returns True if the file was modified."""
    with open(filepath, "r") as f:
        data = json.load(f)

    progress = data.get("progress_percentage", 0)

    # Already complete — nothing to do
    if progress >= THRESHOLD_COMPLETE or data.get("status") == STATUS_COMPLETE:
        return False

    # Don't re-update on the same day
    if data.get("last_reported_date") == TODAY:
        return False

    # Calculate new progress
    increment = random.randint(MIN_DAILY_INCREMENT, MAX_DAILY_INCREMENT)
    new_progress = min(progress + increment, THRESHOLD_COMPLETE)

    data["progress_percentage"] = new_progress
    data["last_reported_date"] = TODAY
    data["reported_to_copilot"] = True

    # Build log entry
    log_entry = {"date": TODAY, "entry": f"Daily learning update. Progress advanced from {progress}% to {new_progress}%."}

    # Handle status transitions
    old_status = data.get("status", STATUS_INDEPENDENT)

    if new_progress >= THRESHOLD_COMPLETE and old_status != STATUS_COMPLETE:
        data["status"] = STATUS_COMPLETE
        data["learning_mode"] = "complete"
        log_entry["entry"] += " " + COMPLETE_LOG_ENTRY

    elif new_progress >= THRESHOLD_ADVANCED and old_status == STATUS_INDEPENDENT:
        data["status"] = STATUS_ADVANCED
        data["learning_mode"] = "advanced"
        data["notify_copilot_at"] = "75%"
        data["next_phase_trigger"] = "75%"
        log_entry["entry"] += " " + ADVANCED_LOG_ENTRY

    # Append to learning_log
    if "learning_log" not in data:
        data["learning_log"] = []
    data["learning_log"].append(log_entry)

    with open(filepath, "w") as f:
        json.dump(data, f, indent=2)
        f.write("\n")

    print(f"Updated {os.path.basename(filepath)}: {progress}% -> {new_progress}% ({data['status']})")
    return True


def main():
    updated = 0
    skipped = 0
    for filename in sorted(os.listdir(BOTS_DIR)):
        if not filename.startswith("bot_") or not filename.endswith(".json"):
            continue
        filepath = os.path.join(BOTS_DIR, filename)
        if update_bot(filepath):
            updated += 1
        else:
            skipped += 1
            print(f"Skipped {filename} (already up-to-date or complete)")

    print(f"\nDone. Updated: {updated}, Skipped: {skipped}")


if __name__ == "__main__":
    main()
