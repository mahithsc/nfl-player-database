const puppeteer = require('puppeteer');
const fs = require('fs/promises');

//array of all the football teams
const teamsID = [
    'arizona-cardinals', 
    'atlanta-falcons', 
    'carolina-panthers', 
    'chicago-bears', 
    'dallas-cowboys', 
    'detroit-lions', 
    'green-bay-packers',
    'los-angeles-rams',
    'minnesota-vikings',
    'new-orleans-saints',
    'new-york-giants',
    'philadelphia-eagles',
    'san-francisco-49ers',
    'seattle-seahawks',
    'tampa-bay-buccaneers',
    'washington-commanders',
    'baltimore-ravens',
    'buffalo-bills',
    'cincinnati-bengals',
    'cleveland-browns',
    'denver-broncos',
    'houston-texans',
    'indianapolis-colts',
    'jacksonville-jaguars',
    'kansas-city-chiefs',
    'las-vegas-raiders',
    'los-angeles-chargers',
    'miami-dolphins',
    'new-england-patriots',
    'new-york-jets',
    'pittsburgh-steelers',
    'tennessee-titans',
];



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