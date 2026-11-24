// Renders boardeasy-bmc.html to a print-ready A4 PDF and reports layout problems.
const { chromium } = require('playwright');
const path = require('path');
(async () => {
  const out = process.argv[2] || path.join(__dirname, '..', 'BoardEasy_Business_Model_Canvas.pdf');
  const b = await chromium.launch();
  const pg = await b.newPage();
  await pg.goto('file://' + path.join(__dirname, 'boardeasy-bmc.html'));
  await pg.evaluate(() => document.fonts.ready);
  const issues = await pg.evaluate(() => {
    const res = [];
    document.querySelectorAll('.page').forEach(p => {
      const pr = p.getBoundingClientRect();
      const padB = parseFloat(getComputedStyle(p).paddingBottom);
      p.querySelectorAll('*').forEach(el => {
        if (el.closest('svg') && el.tagName !== 'svg') return;
        if (el.classList.contains('folio') || el.closest('.folio')) return;
        const r = el.getBoundingClientRect(); if (!r.width) return;
        if (r.bottom > pr.bottom - padB + 0.5 || r.right > pr.right - 52 + 0.5 && !el.classList.contains('arch'))
          res.push(`${p.id}: <${el.tagName.toLowerCase()} class="${el.className.baseVal ?? el.className}"> overflows by ${Math.round(Math.max(r.bottom - (pr.bottom - padB), r.right-(pr.right-52)))}px`);
      });
      const last = [...p.children].filter(c => !c.classList.contains('folio')).pop();
      res.push(`${p.id}: free space below content = ${Math.round(pr.bottom - padB - last.getBoundingClientRect().bottom)}px`);
    });
    const fonts = [...document.fonts].filter(f => f.status === 'loaded').map(f => f.family + ' ' + f.weight);
    res.push('fonts loaded: ' + [...new Set(fonts)].join(', '));
    return res;
  });
  console.log(issues.join('\n'));
  await pg.pdf({ path: out, printBackground: true, preferCSSPageSize: true });
  await b.close();
  console.log('PDF written: ' + out);
})();
