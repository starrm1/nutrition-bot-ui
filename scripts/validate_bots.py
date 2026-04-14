import json
import glob
import sys

# Fields required on every bot
REQUIRED_FIELDS = ("bot_id", "role", "team", "phase", "status", "progress_percentage", "progress_target")

# Additional fields required only on department-head bots (bot_id 22–30)
DEPT_HEAD_IDS = {22, 23, 24, 25, 26, 27, 28, 29, 30}
DEPT_HEAD_REQUIRED = ("department_structure",)

# Fields required inside department_structure for dept-head bots
DEPT_STRUCT_REQUIRED = (
    "department_number",
    "department_name",
    "department_head_bot",
    "total_co_departments",
    "total_sub_departments",
    "co_department_bot_supervisors",
    "co_departments",
)

# Valid phase values
VALID_PHASES = {
    "initial_learning",
    "collaborative_learning",
    "advanced_learning",
    "independent_learning",
}

files = sorted(glob.glob("bots-learning/bot_*.json"))
failed = []

for path in files:
    errors = []

    with open(path) as fh:
        data = json.load(fh)

    # --- Required top-level fields ---
    for field in REQUIRED_FIELDS:
        if field not in data or data[field] is None or data[field] == "":
            errors.append("missing required field: {}".format(field))

    # --- Phase value validity ---
    phase = data.get("phase")
    if phase and phase not in VALID_PHASES:
        errors.append("unrecognised phase value: {!r} (expected one of {})".format(
            phase, sorted(VALID_PHASES)))

    # --- progress_percentage must be 0–100 ---
    prog = data.get("progress_percentage")
    target = data.get("progress_target")
    if prog is not None:
        try:
            if not (0 <= float(prog) <= 100):
                errors.append("progress_percentage out of range 0–100: {}".format(prog))
        except (TypeError, ValueError):
            errors.append("progress_percentage is not a number: {!r}".format(prog))
    if target is not None:
        try:
            if float(target) <= 0:
                errors.append("progress_target must be positive: {}".format(target))
        except (TypeError, ValueError):
            errors.append("progress_target is not a number: {!r}".format(target))

    # --- Department-head-specific checks ---
    bot_id = data.get("bot_id")
    try:
        numeric_id = int(bot_id)
    except (TypeError, ValueError):
        numeric_id = None

    if numeric_id in DEPT_HEAD_IDS:
        for field in DEPT_HEAD_REQUIRED:
            if field not in data:
                errors.append("department-head bot missing field: {}".format(field))

        ds = data.get("department_structure")
        if isinstance(ds, dict):
            for field in DEPT_STRUCT_REQUIRED:
                if field not in ds:
                    errors.append("department_structure missing field: {}".format(field))

            # Cross-check declared vs actual co-department counts
            declared = ds.get("total_co_departments")
            actual = len(ds.get("co_departments") or [])
            if declared is not None and actual != int(declared):
                errors.append(
                    "department_structure.total_co_departments={} but "
                    "co_departments list has {} entries".format(declared, actual)
                )

    if errors:
        for err in errors:
            print("FAIL {}: {}".format(path, err))
        failed.append(path)
    else:
        print("OK   {}".format(path))

if failed:
    print("\n{} bot JSON file(s) failed validation.".format(len(failed)))
    sys.exit(1)

print("All bot JSON files passed validation.")
