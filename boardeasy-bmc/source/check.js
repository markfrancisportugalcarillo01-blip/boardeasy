// Reports any canvas block whose content does not fit, and how much spare room each has.
const { chromium } = require('playwright'); const path = require('path');
(async () => {
  const b = await chromium.launch(); const pg = await b.newPage();
  await pg.goto('file://' + path.join(__dirname, 'boardeasy-bmc.html')); await pg.evaluate(() => document.fonts.ready);
  console.log((await pg.evaluate(() => [...document.querySelectorAll('.blk')].map(el => {
    const last = [...el.children].pop(); const r = el.getBoundingClientRect(), l = last.getBoundingClientRect();
    const pad = parseFloat(getComputedStyle(el).paddingBottom);
    return `${el.classList[1]}: spare ${((r.bottom - pad - l.bottom) * 0.2646).toFixed(1)} mm${el.scrollHeight > el.clientHeight + 1 ? '  OVERFLOW' : ''}`;
  }))).join('\n'));
  await b.close();
})();
