const puppeteer = require('puppeteer');
const fs = require('fs/promises');

//array of all the football teams
const teamsID = [
    'https://www.espn.com/nfl/team/depth/_/name/buf',
    'https://www.espn.com/nfl/team/depth/_/name/mia',
    'https://www.espn.com/nfl/team/depth/_/name/ne',
    'https://www.espn.com/nfl/team/depth/_/name/nyj',
    'https://www.espn.com/nfl/team/depth/_/name/bal',
    'https://www.espn.com/nfl/team/depth/_/name/cin',
    'https://www.espn.com/nfl/team/depth/_/name/cle',
    'https://www.espn.com/nfl/team/depth/_/name/pit',
    'https://www.espn.com/nfl/team/depth/_/name/hou',
    'https://www.espn.com/nfl/team/depth/_/name/ind',
    'https://www.espn.com/nfl/team/depth/_/name/jax',
    'https://www.espn.com/nfl/team/depth/_/name/ten',
    'https://www.espn.com/nfl/team/depth/_/name/den',
    'https://www.espn.com/nfl/team/depth/_/name/kc',
    'https://www.espn.com/nfl/team/depth/_/name/oak',
    'https://www.espn.com/nfl/team/depth/_/name/sd',
    'https://www.espn.com/nfl/team/depth/_/name/dal',
    'https://www.espn.com/nfl/team/depth/_/name/nyg',
    'https://www.espn.com/nfl/team/depth/_/name/phi',
    'https://www.espn.com/nfl/team/depth/_/name/was',
    'https://www.espn.com/nfl/team/depth/_/name/chi',
    'https://www.espn.com/nfl/team/depth/_/name/det',
    'https://www.espn.com/nfl/team/depth/_/name/gb',
    'https://www.espn.com/nfl/team/depth/_/name/min',
    'https://www.espn.com/nfl/team/depth/_/name/atl',
    'https://www.espn.com/nfl/team/depth/_/name/car',
    'https://www.espn.com/nfl/team/depth/_/name/no',
    'https://www.espn.com/nfl/team/depth/_/name/tb',
    'https://www.espn.com/nfl/team/depth/_/name/ari',
    'https://www.espn.com/nfl/team/depth/_/name/sf',
    'https://www.espn.com/nfl/team/depth/_/name/sea',
    'https://www.espn.com/nfl/team/depth/_/name/lar'

];

(async () => {
    const browser = await puppeteer.launch({});
    const page = await browser.newPage();

    for (const id of teamsID) {
        await page.goto(id);

        const quarterback = await page.evaluate(() => {
            const qb = document.querySelectorAll('#fittPageContainer > div.StickyContainer > div.page-container.cf > div > div > section > div > section > div.nfl-depth-table > div:nth-child(1) > div > div.flex > div > div.Table__Scroller > table > tbody > tr:nth-child(1) > td:nth-child(1) > span > a');
            const qbName = qb.innerText;
        })

    }
})();


// (async () => {
//     const browser = await puppeteer.launch({headless: false});
//     const page = await browser.newPage();
//     await page.goto('https://www.espn.com/nfl/team/depth/_/name/buf/buffalo-bills');
//     await page.screenshot({path: 'roster.png', fullPage: true});

//     const players = await page.$$eval('#fittPageContainer > div.StickyContainer > div.page-container.cf > div > div > section > div > section > div.nfl-depth-table > div:nth-child(1) > div > div.flex > div > div.Table__Scroller > table > tbody > tr:nth-child(1) > td:nth-child(1) > span > a', players => {
//         return players.map(player => player.textContent)
//     })
//     await fs.writeFile('players.json', players.join('\r\n'))

//     await browser.close();
// })();