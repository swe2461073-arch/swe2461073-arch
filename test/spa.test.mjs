// jsdom дээр router, navbar, i18n-г шалгах автомат тест (жинхэнэ browser биш).
import { JSDOM } from "jsdom";
import { readFileSync } from "node:fs";
import assert from "node:assert/strict";

const html = readFileSync("src/index.html", "utf8").replace(/<script[^>]*><\/script>/g, "");
const dom = new JSDOM(html, { url: "http://localhost/", pretendToBeVisual: true });
globalThis.window = dom.window;
globalThis.document = dom.window.document;
globalThis.localStorage = dom.window.localStorage;

const { mountNavbar } = await import("../src/js/components/navbar.js");
const { initRouter } = await import("../src/js/router.js");
const { routes } = await import("../src/js/routes.js");
const { t, toggleLanguage, getCurrentLanguage } = await import("../src/js/i18n/i18n.js");

mountNavbar(document.getElementById("navbar"));
initRouter(routes);

const nav = (hash) =>
  new Promise((res) => {
    window.addEventListener("hashchange", () => res(), { once: true });
    window.location.hash = hash;
  });
const title = () => document.querySelector("#app h1")?.textContent;
let n = 0;
const ok = (name) => console.log(`✔ ${++n}. ${name}`);

// 1. Navbar
assert.equal(document.querySelectorAll(".navbar-item[href^='#/']").length, 6);
ok("Navbar 5 цэс + лого холбоос зурагдсан");

// 2. Default route: load event
window.dispatchEvent(new window.Event("load"));
assert.equal(title(), "Overview");
assert.ok(document.querySelector("#overview"));
ok("Анхны ачаалалд #/overview (default route) харагдана");

// 3. Routes
for (const [h, expected] of [["#/search", "Search"], ["#/calculation", "Calculation"], ["#/books", "Books"], ["#/contact", "Contact"], ["#/overview", "Overview"]]) {
  await nav(h);
  assert.equal(title(), expected);
}
ok("5 route бүгд hashchange-ээр зөв page рүү шилжинэ");

// 4. Active link
const active = document.querySelector(".navbar-item.is-active");
assert.equal(active.getAttribute("href"), "#/overview");
ok("Идэвхтэй цэс (is-active) зөв тодорно");

// 5. 404
await nav("#/hooson");
assert.equal(title(), "404");
ok("Байхгүй хаяг -> 404 page");

// 6. Burger
const burger = document.querySelector(".navbar-burger");
burger.click();
assert.ok(document.getElementById("topNavbar").classList.contains("is-active"));
assert.equal(burger.getAttribute("aria-expanded"), "true");
burger.click();
assert.ok(!document.getElementById("topNavbar").classList.contains("is-active"));
ok("Burger цэс нээгдэж/хаагдана");

// 7. i18n
assert.equal(getCurrentLanguage(), "en");
assert.equal(t("nav.search"), "Search");
toggleLanguage();
assert.equal(getCurrentLanguage(), "mn");
assert.equal(t("nav.search"), "Хайлт");
assert.equal(t("abc.xyz"), "abc.xyz");
ok("i18n: EN -> MN солигдож, олдохгүй key path-ыг буцаана");

// 8. MN render
window.location.hash = "#/search";
mountNavbar(document.getElementById("navbar"));
window.dispatchEvent(new window.Event("hashchange"));
assert.equal(window.location.hash, "#/search");
assert.equal(title(), "Хайлт");
assert.ok(document.getElementById("langToggle").textContent.includes("EN"));
ok("Монгол хэл дээр page ба navbar зөв харагдана");
console.log(`\nБүх ${n} тест амжилттай`);
process.exit(0);
