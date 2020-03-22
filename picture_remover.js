const fs = require('fs');
const path = require('path');

const directory = './public/ad_pics';

fs.readdir(directory, (err, files) => {
  if (err) throw err;
  files.forEach(picture => fs.unlinkSync(path.join(directory, picture)))
});