// A web scraping script that scrapes the data from https://www.aust.edu/notice and outputs it to a csv file.

const request = require('request');
const cheerio = require('cheerio');

request('https://www.aust.edu/notice', (error, response, html) => {

    if (!error && response.statusCode == 200) {
        console.log('Successfully scraped the website.');
        const $ = cheerio.load(html);
        //const pageHeaderHeading = $('.page_header_heading');


        //console.log(pageHeaderHeading.html()); --> will print the html of the page header heading
        //console.log(pageHeaderHeading.text()); --> will print the text of the page header heading
        //console.log(pageHeaderHeading.find('h1').text()); --> will print the text of the h1 tag in the page header heading
        //console.log(pageHeaderHeading.find('h1').html()); --> will print the html of the h1 tag in the page header heading
        //console.log(pageHeaderHeading.find('h1').attr('class')); --> will print the class of the h1 tag in the page header heading
        //console.log(pageHeaderHeading.find('h1').attr('id')); --> will print the id of the h1 tag in the page header heading
        //console.log(pageHeaderHeading.find('h1').attr('style')); --> will print the style of the h1 tag in the page header heading
        //console.log(pageHeaderHeading.find('h1').attr('title')); --> will print the title of the h1 tag in the page header heading
        //console.log(pageHeaderHeading.find('h1').attr('href')); --> will print the href of the h1 tag in the page header heading
        //console.log(pageHeaderHeading.find('h1').attr('src')); --> will print the src of the h1 tag in the page header heading
        //console.log(pageHeaderHeading.find('h1').attr('alt')); --> will print the alt of the h1 tag in the page header heading
        //console.log(pageHeaderHeading.find('h1').attr('rel')); --> will print the rel of the h1 tag in the page header heading
        //console.log(pageHeaderHeading.find('h1').attr('target')); --> will print the target of the h1 tag in the page header heading
        //console.log(pageHeaderHeading.find('h1').attr('type')); --> will print the type of the h1 tag in the page header heading
        //console.log(pageHeaderHeading.find('h1').attr('value')); --> will print the value of the h1 tag in the page header heading
        //console.log(pageHeaderHeading.find('h1').attr('data-value')); --> will print the data-value of the h1 tag in the page header heading

        // console.log(noticeText.find('a').attr('href'));// --> will print the href of the h1 tag in the page header heading
        // const administrationContentWrapper = $('.administration_content_wrapper');
        //console.log(administrationContentWrapper.children().find('a').attr('href'));// --> will print the text of the h2 tag in the administration content wrapper

        //const notice_slider_container = $('.notice_slider_container');
        //console.log(notice_slider_container.children().find('div').attr('href'));// --> will print the text of the h2 tag in the administration content wrapper

        //const output = pageHeaderHeading.text();
        //console.log(noticeText.children('a'));

        const noticeText = $('.notice_text');

        const output = noticeText.children('a').next().text();

        //console.log(output);

        // works for the links and the texts of the notice

        // $('.notice_text').each((i, el) => {
        //     const output = $(el).children('a').next().text();
        //     const link = $(el).children('a').attr('href');
        //     //get the month of the notice
        //     const month = $(el).children('p').text();
        //     console.log(month);
        //     console.log(output);
        //     console.log(link);

        //     //Give a line break
        //     console.log('\n');
        // });


        $('.notice_slider_container').each((i, el) => {
            const output = $(el).find('.notice_text').children('a').next().text();
            const link = $(el).find('.notice_text').children('a').attr('href');
            const month = $(el).find('.notice_date').find('.month').text();
            const day = $(el).find('.notice_date').find('.day').text();
            const year = $(el).find('.notice_date').find('.year').text();

            console.log(output);
            console.log(link);
            console.log(month + ' ' + day + ' ' + year);
            console.log('\n');

        });
    }
});