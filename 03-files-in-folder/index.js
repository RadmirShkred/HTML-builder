const fs = require('fs');
const path = require('path');
const pathFolder = path.join(__dirname, '/secret-folder');

fs.readdir(pathFolder, {withFileTypes: true}, (e, myDir) => {
  if (e) {
    console.error(e);
  } else {
    for (const elem of myDir) {
      fs.stat(`${pathFolder}/${elem.name}`, (e, stats) => {
        if (e) {
          console.error(e);
        } else {
          if (elem.isFile()) {
            const parts = elem.name.split('.');
            console.log(`${parts[0]} - ${parts[1]} - ${stats.size} bytes`);
          }
        }
      });
    }
  }
});

