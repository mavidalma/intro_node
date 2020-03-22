const fs = require('fs');
const path = require('path');

const directory = './public/ad_pics';

fs.readdir(directory, (err, files) => {
  if (err) throw err;

  for (const file in files) {
    fs.unlink(path.join(directory, file), err => {
      if (err) throw err;
    });
  }
});