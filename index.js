const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
    const browser = await puppeteer.launch({});
    const page = await browser.newPage();
    await page.goto('https://www.nfl.com/teams/new-england-patriots/roster');
})();