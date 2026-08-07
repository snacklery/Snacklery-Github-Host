from pathlib import Path
import re
p = Path('dist/assets/vendor-MaEV8U2j.js')
text = p.read_text(encoding='utf-8', errors='ignore')
for pat in [r'\blet\s+w\b', r'\bconst\s+w\b', r'\bvar\s+w\b', r'\bw\s*=\s*', r'\bw\.createElement\b']:
    matches = list(re.finditer(pat, text))
    print('PATTERN', pat, 'COUNT', len(matches))
    for i, m in enumerate(matches[:10]):
        start = max(0, m.start()-80)
        end = min(len(text), m.end()+80)
        snippet = text[start:end]
        print('MATCH', i, 'INDEX', m.start())
        print(snippet)
        print('---')

# Search for top-level alias definitions near the beginning
start = 0
end = 10000
snippet = text[start:end]
print('TOP_SNIPPET', snippet[:2000])
