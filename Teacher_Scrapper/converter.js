const fs = require('fs');  // File system module
const csv = require('csv-parser');  // CSV parsing module


let mainObj = {};

fs.createReadStream('teachers_info_te.csv')
  .pipe(csv())
  .on('data', (row) => {
    const obj = {
      [row.Email.replace(/\./g, '-')]: {
        Name: row.Name,
        Designation: row.Designation,
        Email: row.Email,
        Imagelink: row.Imagelink,
        PhoneNumber: row.PhoneNumber,
      },
    };
    mainObj = { ...mainObj, ...obj };
  })
  .on('end', () => {
    fs.writeFileSync('data.json', JSON.stringify(mainObj, null, 2));
  });