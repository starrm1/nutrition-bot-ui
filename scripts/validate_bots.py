import json
import glob
import sys

files = sorted(glob.glob("bots-learning/bot_*.json"))
failed = []

for path in files:
    with open(path) as fh:
        data = json.load(fh)
    missing = [field for field in ("role", "team") if not data.get(field)]
    if missing:
        print("FAIL {}: missing required fields: {}".format(path, ", ".join(missing)))
        failed.append(path)
    else:
        print("OK   {}".format(path))

if failed:
    print("One or more bot JSON files are missing required fields.")
    sys.exit(1)

print("All bot JSON files passed validation.")
