const fs = require('fs');

function getDirectories(path) {
  return fs.readdirSync(path).filter(file => {
    return fs.statSync(path + '/' + file).isDirectory();
  });
}

exports.valid = () => {
  return 	getDirectories(__dirname);
}

exports.path = name => {
  return __dirname + '/' + name;
}
