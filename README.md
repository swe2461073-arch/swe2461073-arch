# Mongolian Food Composition Database – SPA (2.1–2.5)

Bulma + Sass + Vanilla JavaScript (ES modules) дээр суурилсан Single Page Application.

## Ажиллуулах
```bash
npm install          # bulma, sass, fontawesome, jsdom суулгана
npm run build        # src/scss -> src/css/main.css (нэг удаа compile)
npm run sass         # (заавал биш) scss өөрчлөгдөх бүрт автоматаар compile
npm test             # router/navbar/i18n автомат тест (8 тест)
```
`src/index.html`-ийг VS Code-ийн **Live Server**-ээр нээнэ (ES module тул `file://`-аар ажиллахгүй).

## Бүтэц
```
src/
  index.html
  css/main.css            (sass-аас үүснэ)
  scss/main.scss
  img/icon/icon.png
  js/
    app.js  router.js  routes.js  fontawesomeall.min.js
    pages/       overview, search, calculation, books, contact, notFound
    layouts/     pageLayout.js
    components/  navbar.js
    i18n/        i18n.js, translations.js
test/spa.test.mjs
```
## GitHub Pages
`npm run docs` -> `docs/` хавтас үүсгэнэ (Settings → Pages → master /docs).
