const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');

const departmentName = 'te'
const fileName =  'teachers_info_' + departmentName + '.csv';
const WebsiteLink = 'https://www.aust.edu/' + departmentName + '/faculty_members'
const writeStream = fs.createWriteStream(fileName);


writeStream.write(`Name,Designation,Email,Imagelink,Phone Number\n`);


request( WebsiteLink, (error, response, html) => {

    if (!error && response.statusCode == 200) {
        console.log('Successfully scraped the website.');
        const $ = cheerio.load(html);
        $('.card').each((i, el) => {

            const name = $(el).find('.card-title').text();
            const designation = $(el).find('.card-text').text().trim();

            var email = "Not Available"
            if ($(el).find('.fac_email').text().trim() != "")
                email = $(el).find('.fac_email').text().trim();

            const img = $(el).children('img').attr('src');
            const phone = 'Not Available'

            // console.log(name);
            // console.log(designation);
            // console.log(email)
            // console.log(img)
            // console.log(phone)
            // console.log("\n")

            writeStream.write(`${name},${designation},${email},${img},${phone}\n`);

        });
        console.log('Scraping Complete');
    }
});