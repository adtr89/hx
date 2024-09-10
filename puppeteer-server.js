const chromium = require('chrome-aws-lambda');
const puppeteer = require('puppeteer-core');

(async () => {
  const browser = await puppeteer.launch({
    args: chromium.args,
    executablePath: await chromium.executablePath,
    headless: chromium.headless,
  });

  const page = await browser.newPage();
  await page.goto('https://www.haxball.com/headless', { waitUntil: 'networkidle2' });

  // Inicializace místnosti
  await page.evaluate(() => {
    var room = HBInit({ roomName: "Haxball Room on Render", maxPlayers: 10, public: true });

    room.onPlayerJoin = function(player) {
      console.log(player.name + " joined the room");
    };

    room.onPlayerLeave = function(player) {
      console.log(player.name + " left the room");
    };
  });

  console.log('Haxball room is running in a headless browser.');

  // Zavření prohlížeče
  await browser.close();
})();
