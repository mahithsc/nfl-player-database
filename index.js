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
    'https://www.espn.com/nfl/team/depth/_/name/lac/los-angeles-chargers',
    'https://www.espn.com/nfl/team/depth/_/name/dal',
    'https://www.espn.com/nfl/team/depth/_/name/nyg',
    'https://www.espn.com/nfl/team/depth/_/name/phi',
    'https://www.espn.com/nfl/team/depth/_/name/wsh/washington',
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
        const teamname = id.slice(42)
        await page.goto(id);

        //quarterback
        const qb = await page.$eval('#fittPageContainer > div.StickyContainer > div.page-container.cf > div > div > section > div > section > div.nfl-depth-table > div:nth-child(1) > div > div.flex > div > div.Table__Scroller > table > tbody > tr:nth-child(1) > td:nth-child(1) > span > a', el => el.innerText);

        //running back
        const rb = await page.$eval('#fittPageContainer > div.StickyContainer > div.page-container.cf > div > div > section > div > section > div.nfl-depth-table > div:nth-child(1) > div > div.flex > div > div.Table__Scroller > table > tbody > tr:nth-child(2) > td:nth-child(1) > span > a', el => el.innerText);

        //wide reciever one
        const wr = await page.$eval('#fittPageContainer > div.StickyContainer > div.page-container.cf > div > div > section > div > section > div.nfl-depth-table > div:nth-child(1) > div > div.flex > div > div.Table__Scroller > table > tbody > tr:nth-child(3) > td:nth-child(1) > span > a', el => el.innerText);

        //wide reciever two
        const wrTwo = await page.$eval('#fittPageContainer > div.StickyContainer > div.page-container.cf > div > div > section > div > section > div.nfl-depth-table > div:nth-child(1) > div > div.flex > div > div.Table__Scroller > table > tbody > tr:nth-child(4) > td:nth-child(1) > span > a', el => el.innerText);

        //wide reciever three
        const wrThree = await page.$eval('#fittPageContainer > div.StickyContainer > div.page-container.cf > div > div > section > div > section > div.nfl-depth-table > div:nth-child(1) > div > div.flex > div > div.Table__Scroller > table > tbody > tr:nth-child(5) > td:nth-child(1) > span > a', el => el.innerText);

        //tight end
        const te = await page.$eval('#fittPageContainer > div.StickyContainer > div.page-container.cf > div > div > section > div > section > div.nfl-depth-table > div:nth-child(1) > div > div.flex > div > div.Table__Scroller > table > tbody > tr:nth-child(6) > td:nth-child(1) > span > a', el => el.innerText);

        //creates an objec with the team players
        const team = {
            qb: qb,
            rb: rb,
            wr: wr,
            wrTwo: wrTwo,
            wrThree: wrThree,
            te: te
        }

        fs.appendFile('players.json', JSON.stringify(team,))
    }
})();