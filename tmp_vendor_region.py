from pathlib import Path
import re
p = Path('dist/assets/vendor-MaEV8U2j.js')
text = p.read_text(encoding='utf-8', errors='ignore')
idx = 26201
start = max(0, idx-1000)
end = min(len(text), idx+1000)
region = text[start:end]
print('REGION LENGTH', len(region), 'START', start, 'END', end)
for pat in [r'\b(let|const|var)\s+w\b', r'\bw\s*=', r'\bw\b', r'\bfunction\b', r'\bconst\b', r'\blet\b', r'\bvar\b']:
    print('PATTERN', pat)
    for m in re.finditer(pat, region):
        print('  AT', m.start()+start, '->', region[max(0,m.start()-40):m.end()+40].replace('\n','\\n'))
        break
print('---')
print(region)
