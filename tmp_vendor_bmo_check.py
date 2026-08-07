from pathlib import Path
path = Path('dist/assets/vendor-BmoA-Fiw.js')
text = path.read_text(encoding='utf-8', errors='ignore')
# find the reported line and char by line scan
lines = text.split('\n')
line = 26
if line <= len(lines):
    print('LINE_26:', lines[line-1])
    idx = 132
    print('CHAR CONTEXT:', repr(lines[line-1][max(0, idx-40):idx+40]))
# search for useState and relevant import alias declarations
for pat in ['useState', 'React', 'var w=', 'import{R as w', 'import * as React', 'from "react"']:
    print('PATTERN', pat, 'COUNT', text.count(pat))
    if pat in text:
        i = text.find(pat)
        print('FIRST', i, text[max(0, i-100):i+100])
