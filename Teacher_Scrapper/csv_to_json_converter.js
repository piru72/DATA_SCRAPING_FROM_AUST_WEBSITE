// This module will convert teachers data found in csv to json in the way needed in firebase (email as key with . replaced with _)

//! The code is done by https://github.com/s-m-arafat
const fs = require('fs'); // File system module
const csv = require('csv-parser'); // CSV parsing module


// Provide input and output files name
const input_file_name = 'teachers_info_as.csv';
const output_file_name = 'teachers_info_as.json';


let mainObj = {};
// Read the CSV file
fs.createReadStream(input_file_name)
  .pipe(csv())
  .on('data', (row) => {
    const obj = {
      [row.Email?.replace(/\./g, '-')]: {
        name: row.Name,
        designation: row.Designation,
        email: row.Email,
        img: row.Imagelink,
        phone: row.PhoneNumber
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