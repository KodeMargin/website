path = r'f:\KodeMargin\Projects\Website\web\src\app\packages\page.tsx'

with open(path, 'rb') as f:
    raw = f.read()

search = b'href="/contact"'
pos = 0
occ = 0
target_pos = -1

while True:
    pos = raw.find(search, pos)
    if pos == -1:
        break
    occ += 1
    context = raw[pos:pos+250]
    if b'pkg.recommended' in context:
        target_pos = pos
    pos += 1

if target_pos == -1:
    print('ERROR: target not found')
else:
    # Replace just the href at target_pos
    old_href = b'href="/contact"'
    new_href = b'href={`/contact?package=${pkg.tier}`}'
    raw = raw[:target_pos] + new_href + raw[target_pos + len(old_href):]
    with open(path, 'wb') as f:
        f.write(raw)
    print(f'SUCCESS: replaced occurrence at byte {target_pos}')
