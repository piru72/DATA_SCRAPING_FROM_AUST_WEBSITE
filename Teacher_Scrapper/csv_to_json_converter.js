// This module will convert teachers data found in csv to json in the way needed in firebase (email as key with . replaced with _)
const fs = require('fs'); // File system module
const csv = require('csv-parser'); // CSV parsing module


// Provide input and output files name
const input_file_name = 'teachers_info_te.csv';
const output_file_name = 'teachers_info_te.json';


let mainObj = {};
// Read the CSV file
fs.createReadStream(input_file_name)
  .pipe(csv())
  .on('data', (row) => {
    const obj = {
      [row.Email?.replace(/\./g, '-')]: {
        Name: row.Name,
        Designation: row.Designation,
        Email: row.Email,
        Imagelink: row.Imagelink,
        PhoneNumber: row.PhoneNumber,
      },
    };
    mainObj = {
      ...mainObj,
      ...obj
    };
  })
  .on('end', () => {
    fs.writeFileSync(output_file_name, JSON.stringify(mainObj, null, 2));
  });