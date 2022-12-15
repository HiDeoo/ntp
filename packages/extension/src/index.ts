import fs from 'node:fs/promises'

import Zip from 'adm-zip'

import pkg from '../package.json'

await fs.rm('dist', { force: true, recursive: true })
await fs.mkdir('dist')

const archive = new Zip()

archive.addLocalFile('src/manifest.json')
archive.addLocalFile('src/ntp.html')
archive.addLocalFile('src/ntp.js')
archive.addLocalFolder('src/images', 'images')

archive.writeZip(`dist/ntp-extension-${pkg.version}.zip`)
