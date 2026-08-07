from pathlib import Path
p = Path('dist/assets/vendor-MaEV8U2j.js')
t = p.read_text(encoding='utf-8', errors='ignore')
i = t.find('=w.createElement')
print('FIRST_CREATE', i)
if i != -1:
    print(t[max(0, i-200):i+200])
j = t.find('var w')
print('VARW', j)
if j != -1:
    print(t[max(0, j-200):j+200])
