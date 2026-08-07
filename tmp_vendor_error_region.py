from pathlib import Path
p = Path('dist/assets/vendor-MaEV8U2j.js')
text = p.read_text(encoding='utf-8', errors='ignore')
idx = 26201
start = max(0, idx-120)
end = min(len(text), idx+120)
region = text[start:end]
line_num = text.count('\n', 0, idx) + 1
line_start = text.rfind('\n', 0, idx)
if line_start == -1:
    line_start = 0
else:
    line_start += 1
col = idx - line_start + 1
print('IDX', idx, 'LINE', line_num, 'COL', col, 'START', start, 'END', end)
print('REGION:')
print(region)
