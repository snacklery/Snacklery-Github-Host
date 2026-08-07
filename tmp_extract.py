from pathlib import Path
p = Path('dist/assets/vendor-MaEV8U2j.js')
text = p.read_text(encoding='utf-8', errors='ignore')
idx = 26201
print('BEFORE:' + text[idx-60:idx])
print('AFTER:' + text[idx:idx+60])
print('LINE', text.count('\n', 0, idx) + 1, 'COL', idx - text.rfind('\n', 0, idx))
