const fs = require('fs');
const path = require('path');

const moduleName = process.env.npm_config_name;
const modulePath = path.join(__dirname, '../src/modules/' + moduleName);

try {
  if (fs.existsSync(modulePath)) {
    console.error('module exist');

    return;
  }

  fs.mkdirSync(modulePath);
  fs.writeFileSync(path.join(modulePath, moduleName + '.service' + '.ts'), '');
  fs.writeFileSync(path.join(modulePath, moduleName + '.module' + '.ts'), '');
  fs.writeFileSync(path.join(modulePath, moduleName + '.interface' + '.ts'), '');
  fs.writeFileSync(path.join(modulePath, moduleName + '.dto' + '.ts'), '');
  fs.writeFileSync(path.join(modulePath, moduleName + '.dao' + '.ts'), '');
  fs.writeFileSync(path.join(modulePath, moduleName + '.swagger' + '.ts'), '');
  fs.writeFileSync(path.join(modulePath, moduleName + '.controller' + '.ts'), '');
  fs.writeFileSync(path.join(modulePath, moduleName + '.controller.spec' + '.ts'), '');
} 
catch(err) {
  console.error(err);
}