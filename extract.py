import json

logs_path = '/Users/shashwat/.gemini/antigravity-ide/brain/ae95dd73-982b-4494-bcca-912c3a27e988/.system_generated/logs/transcript.jsonl'

with open(logs_path, 'r', encoding='utf-8') as f:
    for line in f:
        try:
            data = json.loads(line)
            if data.get("step_index") == 282:
                content = data.get("content", "")
                with open('debug_content.txt', 'w', encoding='utf-8') as debug_file:
                    debug_file.write(content)
                print("Wrote debug_content.txt! Length:", len(content))
        except Exception as e:
            pass
