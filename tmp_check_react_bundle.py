from pathlib import Path
for name in ['dist/assets/vendor-BmoA-Fiw.js','dist/assets/vendor-react-DbCMq254.js']:
    p = Path(name)
    text = p.read_text(encoding='utf-8', errors='ignore')
    print('---', name, '---')
    if name.endswith('BmoA-Fiw.js'):
        idx = text.find('var Fe=')
        print('Fe idx', idx)
        if idx!=-1:
            print(text[idx:idx+260])
        idx2 = text.find('import{r as it')
        print('import it idx', idx2)
        if idx2!=-1:
            print(text[idx2:idx2+200])
    else:
        idx = text.find('export{')
        print('export idx', idx)
        if idx!=-1:
            print(text[idx:idx+260])
