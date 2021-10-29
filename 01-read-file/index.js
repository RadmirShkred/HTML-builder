const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'text.txt');

fs.readFile(file, function (err, data) {
  if (err) {
    return console.error(err);
  }
  console.log(data.toString());
});

