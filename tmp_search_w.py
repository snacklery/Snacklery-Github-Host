from pathlib import Path
import re
path = Path('dist/assets/vendor-MaEV8U2j.js')
text = path.read_text(encoding='utf-8', errors='ignore')
patterns = [r'\b(var|let|const)\s+w\b', r'\bw\s*=\s*', r'import\s*\{[^}]*\bw\b[^}]*\}', r'\bclass\s+.*\bw\b', r'\bfunction\s+.*\bw\b']
for pat in patterns:
    print('PATTERN', pat)
    matches = list(re.finditer(pat, text))
    print('COUNT', len(matches))
    for m in matches[:5]:
        start = max(0, m.start()-120)
        end = min(len(text), m.end()+120)
        snippet = text[start:end]
        print('MATCH AT', m.start())
        print(snippet)
        print('---')
