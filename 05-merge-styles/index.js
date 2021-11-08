const fs = require('fs');
const path = require('path');
const mainDir = path.join(__dirname, 'styles');
const copyDir = path.join(__dirname, 'project-dist');
const copyFiles = path.join(copyDir, 'bundle.css');

fs.writeFile(copyFiles, '', e => {
  if (e) throw e;
});

fs.unlink(copyFiles, e => {
  if (e) throw e;
});

fs.readdir(mainDir, {withFileTypes: true}, (e, files) => {
  if (e) throw e;
  for (const file of files) {
    if (file.isFile() && path.extname(file.name).slice(1) === 'css') {
      fs.readFile(path.join(mainDir, file.name), (e, data) => {
        if (e) throw e;
        fs.writeFile(copyFiles, '', e => {
          if (e) throw e;
        });
        fs.appendFile(copyFiles, data, (e) => {
          if (e) throw e;
        });
      });
    }
  }
});
