const fsPromises = require('fs/promises');
const path = require('path');
const mainDir = path.join(__dirname, 'files');
const copyDir = path.join(__dirname, 'files-copy');

async function mkCopyDir() {
  await fsPromises.rmdir(copyDir, {recursive: true});
  await fsPromises.mkdir(copyDir, {recursive: true});
  const files = await fsPromises.readdir(mainDir, {withFileTypes: true});
  for (const file of files) {
    if (file.isFile()) {
      const from = path.join(mainDir, file.name);
      const to = path.join(copyDir, file.name);
      await fsPromises.copyFile(from, to);
    }
  }
}

mkCopyDir();
