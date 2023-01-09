const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');

const departmentName = 'as'
const fileName = 'teachers_info_' + departmentName + '.csv';
const WebsiteLink = 'https://www.aust.edu/' + departmentName + '/faculty_members'

 //!FOR ME 
// const WebsiteLink = 'https://www.aust.edu/mpe/faculty_members_me'

//! FOR IPE
//const WebsiteLink = 'https://aust.edu/mpe/faculty_members_ipe'




const writeStream = fs.createWriteStream(fileName);


writeStream.write(`Name,Designation,Email,Imagelink,PhoneNumber\n`);


request(WebsiteLink, (error, response, html) => {

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

    
            var converted = "\"";

            for (var i = 0; i < email.length; i++) {
                if (email[i] == ".")
                    converted += "-";
                else
                    converted += email[i];
            }
            converted+= "\":"
            console.log(converted)
            // console.log(img)
            // console.log(phone)
            // console.log("\n")

            writeStream.write(`${name},${designation},${email},${img},${phone}\n`);

        });
        console.log('Scraping Complete');
    }
});