// Renders panel-qa.html to an A4 PDF with page numbers.
const { chromium } = require('playwright'); const path = require('path');
(async () => {
  const b = await chromium.launch(); const pg = await b.newPage();
  await pg.goto('file://' + path.join(__dirname, 'panel-qa.html')); await pg.evaluate(() => document.fonts.ready);
  await pg.pdf({ path: path.join(__dirname, '..', 'BoardEasy_Panel_QA.pdf'), printBackground: true, preferCSSPageSize: true,
    displayHeaderFooter: true, headerTemplate: '<span></span>',
    footerTemplate: '<div style="width:100%;font-size:7px;color:#556578;font-family:sans-serif;padding:0 16mm;display:flex;justify-content:space-between"><span>BoardEasy panel Q&amp;A</span><span>Page <span class="pageNumber"></span> of <span class="totalPages"></span></span></div>' });
  await b.close(); console.log('PDF written');
})();
