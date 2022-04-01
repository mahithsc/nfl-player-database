const puppeteer = require('puppeteer');
const fs = require('fs/promises');

//array of all the football teams
const teamsID = [
    'arizona-cardinals', 
    'atlanta-falcons', 
    'carolina-panthers', 
    'chicago-bears',
    'dal/dallas-cowboys', 
    'detroit-lions', 
    'green-bay-packers',
    'los-angeles-rams',
    'minnesota-vikings',
    'new-orleans-saints',
    'nyg/new-york-giants',
    'phi/philadelphia-eagles',
    'san-francisco-49ers',
    'seattle-seahawks',
    'tampa-bay-buccaneers',
    'wsh/washington-commanders',
    'baltimore-ravens',
    'buf/buffalo-bills',
    'cincinnati-bengals',
    'cleveland-browns',
    'denver-broncos',
    'houston-texans',
    'indianapolis-colts',
    'jacksonville-jaguars',
    'kansas-city-chiefs',
    'las-vegas-raiders',
    'los-angeles-chargers',
    'mia/miami-dolphins',
    'ne/new-england-patriots',
    'nyj/new-york-jets',
    'pittsburgh-steelers',
    'tennessee-titans',
];



(async () => {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.goto('https://www.espn.com/nfl/team/depth/_/name/buf/buffalo-bills');
    await page.screenshot({path: 'roster.png', fullPage: true});

    const players = await page.$$eval('#fittPageContainer > div.StickyContainer > div.page-container.cf > div > div > section > div > section > div.nfl-depth-table > div:nth-child(1) > div > div.flex > div > div.Table__Scroller > table > tbody > tr:nth-child(1) > td:nth-child(1) > span > a', players => {
        return players.map(player => player.textContent)
    })
    await fs.writeFile('names.txt', players.join('\r\n'))

    await browser.close();
})();