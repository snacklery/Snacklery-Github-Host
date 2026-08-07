from pathlib import Path
p = Path('dist/assets/vendor-BmoA-Fiw.js')
text = p.read_text(encoding='utf-8', errors='ignore')
print('HEADER')
print(text[:1200])
print('---')
print('SEARCH it=')
for i, line in enumerate(text.split('\n')):
    if 'it=' in line or 'var it' in line or 'const it' in line or 'import' in line:
        print(i+1, line)
        if i > 40:
            break
