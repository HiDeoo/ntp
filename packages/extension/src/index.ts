import fs from 'node:fs/promises'

import Zip from 'adm-zip'

await fs.rm('dist', { force: true, recursive: true })
await fs.mkdir('dist')

const archive = new Zip()

archive.addLocalFile('src/manifest.json')
archive.addLocalFile('src/ntp.html')
archive.addLocalFolder('src/images', 'images')

archive.writeZip('dist/ntp.zip')
