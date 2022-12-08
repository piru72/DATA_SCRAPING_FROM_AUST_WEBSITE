const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');

const writeStream = fs.createWriteStream('teachers_info.csv');

writeStream.write(`Name,Designation,email,imaage_link\n`);

request('https://www.aust.edu/eee/faculty_members', (error, response, html) => {

    if (!error && response.statusCode == 200) {
        console.log('Successfully scraped the website.');
        const $ = cheerio.load(html);
        $('.card').each((i, el) => {
         

            const Designation = $(el).find('.card-text').text();
            const name = $(el).find('.card-title').text();
            const email = $(el).find('.fac_email').text();
            const img = $(el).children('img').attr('src');
            


            console.log(name);
            console.log(Designation);
            console.log(email)
            console.log(img)
            console.log(" \n")
            
        });
        console.log('Scraping Complete');
    }
});