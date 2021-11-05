const fs = require('fs');
const path = require('path');
const process = require('process');
const { stdin, stdout } = require('process');
const readline = require('readline');
const filePath = path.join(__dirname, 'test1.txt');
let writeStream = new fs.createWriteStream(filePath, {encoding: 'utf8'});

const readingLine = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

readingLine.question('Type here anything: ', answer => {
  if (answer === 'exit') {
    readingLine.close();
    stdout.write('Goodbye');
  } else {
    writeStream.write(answer + '\n');
  }
  readingLine.on('line', input => {
    if (input === 'exit') {
      readingLine.close();
    } else {
      writeStream.write(input + '\n');
    }
  });
  readingLine.on('close', () => {
    stdout.write('Goodbye');
  });
});
