from pathlib import Path
path = Path('dist/assets/vendor-react-DbCMq254.js')
text = path.read_text(encoding='utf-8', errors='ignore')
for pat in ['r as ', ',r as', ' as r,', ' as r}']:
    idx = text.find(pat)
    if idx != -1:
        print('PATTERN', pat, 'INDEX', idx)
        print(text[max(0, idx-60):idx+120])
        print('---')
print('EXPORT LINE SNIPPET:')
idx = text.find('export{')
print(idx)
if idx != -1:
    print(text[idx:idx+300])
