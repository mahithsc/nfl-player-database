const puppeteer = require('puppeteer');
const fs = require('fs/promises');

(async () => {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.goto('https://www.nfl.com/teams/new-england-patriots/roster');
    await page.screenshot({path: 'roster.png', fullPage: true});

    const players = await page.$$eval('.nfl-o-roster__player-name.nfl-o-cta--link', players => {
        return players.map(player => player.textContent)
    })
    await fs.writeFile('names.txt', players.join('\r\n'))

    await browser.close();
})();