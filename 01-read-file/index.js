console.clear();

const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, 'text.txt');

const result = fs.createReadStream(file, 'utf8');
result.on('data', chunk => process.stdout.write(chunk));
