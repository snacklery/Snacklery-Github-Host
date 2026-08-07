from pathlib import Path
p = Path('dist/assets/vendor-BmoA-Fiw.js')
text = p.read_text(encoding='utf-8', errors='ignore')
for i, line in enumerate(text.split('\n')[:80], 1):
    print(f'{i}: {line}')
