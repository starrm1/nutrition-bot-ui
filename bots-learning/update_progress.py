#!/usr/bin/env python3
"""
Daily bot progress updater.
Increments each bot's progress_percentage, updates last_reported_date,
adds a learning log entry, and transitions status to advanced_learning at 75%
and learning_complete at 100%.
"""

import json
import os
import random
from datetime import date
from typing import Any

BOTS_DIR = os.path.dirname(os.path.abspath(__file__))
TODAY = date.today().isoformat()

STATUS_INDEPENDENT = "independent_learning"
STATUS_ACTIVE = "active"
STATUS_COLLABORATIVE = "collaborative_learning"
STATUS_ADVANCED = "advanced_learning"
STATUS_COMPLETE = "learning_complete"

# Statuses that indicate a bot has already completed all learning — skip these.
TERMINAL_STATUSES = {STATUS_COMPLETE, "graduated"}

# Statuses eligible for the advanced_learning transition at 75%.
ACTIVE_LEARNING_STATUSES = {STATUS_INDEPENDENT, STATUS_ACTIVE, STATUS_COLLABORATIVE}

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


def _append_log(data: dict[str, Any], entry: dict[str, str]) -> None:
    """Append an entry to the bot's learning_log, initialising it if absent."""
    if "learning_log" not in data:
        data["learning_log"] = []
    data["learning_log"].append(entry)


def _write_bot(filepath: str, data: dict[str, Any]) -> bool:
    """Serialise *data* back to *filepath*. Returns False on write error."""
    try:
        with open(filepath, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
            f.write("\n")
    except OSError as e:
        print(f"WARNING: Could not write {os.path.basename(filepath)}: {e}")
        return False
    return True


def update_bot(filepath: str) -> bool:
    """Update a single bot JSON file. Returns True if the file was modified."""
    try:
        with open(filepath, "r", encoding="utf-8") as f:
            data = json.load(f)
    except json.JSONDecodeError as e:
        print(f"WARNING: Skipping {os.path.basename(filepath)} — invalid JSON: {e}")
        return False
    except OSError as e:
        print(f"WARNING: Skipping {os.path.basename(filepath)} — could not read file: {e}")
        return False

    # Ensure progress_percentage is a number; default to 0 if missing or wrong type
    try:
        progress = int(data.get("progress_percentage", 0) or 0)
    except (TypeError, ValueError):
        progress = 0

    current_status = data.get("status", STATUS_INDEPENDENT)

    # Already in a terminal state — nothing to do.
    if current_status in TERMINAL_STATUSES:
        return False

    # Progress is already at 100% but status wasn't marked complete — fix it.
    if progress >= THRESHOLD_COMPLETE:
        data["status"] = STATUS_COMPLETE
        data["learning_mode"] = "complete"
        data["last_reported_date"] = TODAY
        log_entry = {
            "date": TODAY,
            "entry": (
                f"Status corrected to {STATUS_COMPLETE}. "
                f"Progress was already at {progress}%. {COMPLETE_LOG_ENTRY}"
            ),
        }
        _append_log(data, log_entry)
        _write_bot(filepath, data)
        print(
            f"Fixed {os.path.basename(filepath)}: status corrected to "
            f"{STATUS_COMPLETE} (progress was {progress}%)"
        )
        return True

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
    log_entry: dict[str, str] = {
        "date": TODAY,
        "entry": f"Daily learning update. Progress advanced from {progress}% to {new_progress}%.",
    }

    # Handle status transitions
    if new_progress >= THRESHOLD_COMPLETE:
        data["status"] = STATUS_COMPLETE
        data["learning_mode"] = "complete"
        log_entry["entry"] += " " + COMPLETE_LOG_ENTRY

    elif new_progress >= THRESHOLD_ADVANCED and current_status in ACTIVE_LEARNING_STATUSES:
        data["status"] = STATUS_ADVANCED
        data["learning_mode"] = "advanced"
        data["notify_copilot_at"] = "75%"
        data["next_phase_trigger"] = "75%"
        log_entry["entry"] += " " + ADVANCED_LOG_ENTRY

    _append_log(data, log_entry)

    if not _write_bot(filepath, data):
        return False

    print(f"Updated {os.path.basename(filepath)}: {progress}% -> {new_progress}% ({data.get('status', 'unknown')})")
    return True


def main() -> None:
    updated = 0
    skipped = 0
    try:
        filenames = sorted(os.listdir(BOTS_DIR))
    except OSError as e:
        print(f"ERROR: Cannot read bots directory '{BOTS_DIR}': {e}")
        return
    for filename in filenames:
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
