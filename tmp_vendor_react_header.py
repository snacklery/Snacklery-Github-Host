from pathlib import Path
path = Path('dist/assets/vendor-react-DbCMq254.js')
text = path.read_text(encoding='utf-8', errors='ignore')
print(text[:1200])
for i, line in enumerate(text.split('\n')[:120]):
    if 'export{' in line or 'export {' in line or 'var ' in line or 'import' in line:
        print(i+1, line)
