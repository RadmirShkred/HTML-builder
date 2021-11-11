const fs = require('fs');
const fsAsync = require('fs/promises');
const path = require('path');
const stylesSource = path.join(__dirname, 'styles');
const assetsSource = path.join(__dirname, 'assets');
const componentsSource = path.join(__dirname, 'components');
const templatesSource = path.join(__dirname, 'template.html');
const destPath = path.join(__dirname, 'project-dist');
const destStylesPath = path.join(destPath, 'style.css');
const destAssetsPath = path.join(destPath, 'assets');
let dirExists = false;

fsAsync.mkdir(destPath, {recursive: true});

async function createPage() {
  const reg = new RegExp(/{{\w+}}/g);
  const template = fsAsync.readFile(templatesSource, 'utf-8');
  const components = (await template).match(reg);
  let tempStr = await template;
  for (const elem of components) {
    const replacer = await fsAsync.readFile(path.join(componentsSource, `${elem.replace('{{', '').replace('}}', '')}.html`), 'utf-8');
    tempStr = tempStr.replace(elem, replacer);
    await fsAsync.writeFile(path.join(destPath, 'index.html'), tempStr, 'utf-8');
  }
}

async function createCSS() {
  const styles = await fsAsync.readdir(stylesSource, {withFileTypes: true});
  for (const elem of styles) {
    if (elem.isFile() && path.extname(elem.name).slice(1) === 'css') {
      fs.readFile(path.join(stylesSource, elem.name), (e, data) => {
        if (e) throw e;
        fs.appendFile(destStylesPath, data, (e) => {
          if (e) throw e;
        });
      });
    }
  }
}

async function copyFile() {
  if (dirExists) {
    await fsAsync.rmdir(destAssetsPath, {recursive: true});
  }
  await fsAsync.mkdir(destAssetsPath, {recursive: true});
  fs.readdir(assetsSource, (e, files) => {
    if (e) throw e;
    for (const elem of files) {
      const deepDirPath = path.join(path.join(assetsSource, elem));
      fs.mkdir(path.join(destAssetsPath, elem), {recursive: true}, (e) => {
        if (e) throw e;
      });
      fs.readdir(deepDirPath, (e, deepFiles) => {
        for (const file of deepFiles) {
          if (e) throw e;
          const input = fs.createReadStream(path.join(deepDirPath, file));
          const output = fs.createWriteStream(path.join(destAssetsPath, elem, file), {autoClose: true});
          input.pipe(output);
        }
      });
    }
  });
}

function checkDirExists() {
  fs.stat(destAssetsPath, e => {
    if (!e) {
      dirExists = true;
      copyFile();
    } else {
      dirExists = false;
      copyFile();
    }
  });
}

createPage();
createCSS();
checkDirExists();
