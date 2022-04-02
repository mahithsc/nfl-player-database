const puppeteer = require('puppeteer');
const fs = require('fs/promises');

//array of all the football teams
const teamsID = [
    // 'https://www.espn.com/nfl/team/depth/_/name/buf',
    // 'https://www.espn.com/nfl/team/depth/_/name/mia',
    // 'https://www.espn.com/nfl/team/depth/_/name/ne',
    // 'https://www.espn.com/nfl/team/depth/_/name/nyj',
    // 'https://www.espn.com/nfl/team/depth/_/name/bal',
    // 'https://www.espn.com/nfl/team/depth/_/name/cin',
    // 'https://www.espn.com/nfl/team/depth/_/name/cle',
    // 'https://www.espn.com/nfl/team/depth/_/name/pit',
    // 'https://www.espn.com/nfl/team/depth/_/name/hou',
    // 'https://www.espn.com/nfl/team/depth/_/name/ind',
    // 'https://www.espn.com/nfl/team/depth/_/name/jax',
    // 'https://www.espn.com/nfl/team/depth/_/name/ten',
    // 'https://www.espn.com/nfl/team/depth/_/name/den',
    // 'https://www.espn.com/nfl/team/depth/_/name/kc',
    // 'https://www.espn.com/nfl/team/depth/_/name/lac/los-angeles-chargers',
    // 'https://www.espn.com/nfl/team/depth/_/name/dal',
    // 'https://www.espn.com/nfl/team/depth/_/name/nyg',
    // 'https://www.espn.com/nfl/team/depth/_/name/phi',
    // 'https://www.espn.com/nfl/team/depth/_/name/wsh/washington',
    // 'https://www.espn.com/nfl/team/depth/_/name/chi',
    // 'https://www.espn.com/nfl/team/depth/_/name/det',
    // 'https://www.espn.com/nfl/team/depth/_/name/gb',
    // 'https://www.espn.com/nfl/team/depth/_/name/min',
    'https://www.espn.com/nfl/team/depth/_/name/atl',
    'https://www.espn.com/nfl/team/depth/_/name/car',
    'https://www.espn.com/nfl/team/depth/_/name/no',
    'https://www.espn.com/nfl/team/depth/_/name/tb',
    'https://www.espn.com/nfl/team/depth/_/name/ari',
    'https://www.espn.com/nfl/team/depth/_/name/sf',
    'https://www.espn.com/nfl/team/depth/_/name/sea',
    'https://www.espn.com/nfl/team/depth/_/name/lar'

];

const setPlayerPosition = ({number}) => {
    if(number === 1){
        return 'QB';
    }
    else if(number === 2){
        return 'RB';
    }  
    else if(number === 3 || number === 4 || number === 5){
        return 'WR';
    }
    else if(number == 6){
        return 'TE';
    }
}

(async () => {
    const browser = await puppeteer.launch({headless: false });
    const page = await browser.newPage();

    for (const id of teamsID) {
        const teamname = id.slice(42)
        await page.goto(id);

        for (let i = 1; i <= 6; i++) {
            const playerName = await page.$eval(`#fittPageContainer > div.StickyContainer > div.page-container.cf > div > div > section > div > section > div.nfl-depth-table > div:nth-child(1) > div > div.flex > div > div.Table__Scroller > table > tbody > tr:nth-child(${i}) > td:nth-child(1) > span > a`, el => el.innerText);
            await page.click(`#fittPageContainer > div.StickyContainer > div.page-container.cf > div > div > section > div > section > div.nfl-depth-table > div:nth-child(1) > div > div.flex > div > div.Table__Scroller > table > tbody > tr:nth-child(${i}) > td:nth-child(1) > span > a`);
            await page.waitForNavigation();
            const playerAge = await page.$eval('#fittPageContainer > div.StickyContainer > div.ResponsiveWrapper > div > div > div.PlayerHeader__Left.flex.items-center.justify-start.overflow-hidden.bb.brdr-clr-gray-09 > div.PlayerHeader__Bio.pv5 > div > ul > li:nth-child(2) > div.fw-medium.clr-black > div', el => el.innerText);
            const playerNumber = await page.$eval('#fittPageContainer > div.StickyContainer > div.ResponsiveWrapper > div > div > div.PlayerHeader__Left.flex.items-center.justify-start.overflow-hidden.bb.brdr-clr-gray-09 > div.PlayerHeader__Main.flex.items-center > div.PlayerHeader__Main_Aside.min-w-0.flex-grow.flex-basis-0 > div > ul > li:nth-child(2)', el => el.innerText);
            const playerHeight = await page.$eval('#fittPageContainer > div.StickyContainer > div.ResponsiveWrapper > div > div > div.PlayerHeader__Left.flex.items-center.justify-start.overflow-hidden.bb.brdr-clr-gray-09 > div.PlayerHeader__Bio.pv5 > div > ul > li:nth-child(1) > div.fw-medium.clr-black > div', el => el.innerText);
            const playerTeam = await page.$eval('#fittPageContainer > div.StickyContainer > div.ResponsiveWrapper > div > div > div.PlayerHeader__Left.flex.items-center.justify-start.overflow-hidden.bb.brdr-clr-gray-09 > div.PlayerHeader__Main.flex.items-center > div.PlayerHeader__Main_Aside.min-w-0.flex-grow.flex-basis-0 > div > ul > li.truncate.min-w-0 > a', el => el.innerText);
            const playerPhotolink = await page.$eval('#fittPageContainer > div.StickyContainer > div.ResponsiveWrapper > div > div > div.PlayerHeader__Left.flex.items-center.justify-start.overflow-hidden.bb.brdr-clr-gray-09 > div > div.PlayerHeader__Image_Container.overflow-hidden.bg-clr-gray-09 > div.PlayerHeader__Image > figure.Image.aspect-ratio--parent.PlayerHeader__HeadShot > div.Image__Wrapper.Image__Wrapper--relative > img', img => (img.getAttribute('src')));
            const playerPosition = setPlayerPosition({number: i});
            await page.goto(id);
            // await page.waitForNavigation();

            const player = {
                name: playerName,
                age: playerAge,
                number: playerNumber,
                height: playerHeight,
                team: playerTeam,
                playerPosition : playerPosition,
                photo: playerPhotolink
            }

            fs.appendFile('players.json', JSON.stringify(player) + ',');
        }
    }
    await browser.close();
})();

