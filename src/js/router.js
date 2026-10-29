// Hash router: URL-ийн # хэсэг өөрчлөгдөхөд тохирох page функцийг ажиллуулна.
export function initRouter(routes) {
  function renderRoute() {
    const hash = window.location.hash || "#/overview";
    const page = routes[hash];

    if (page) {
      page();
    } else {
      routes["#/404"]?.();
    }

    markActiveLink(hash);
  }

  // Идэвхтэй цэсийг тодруулна (өөрийн нэмсэн сайжруулалт)
  function markActiveLink(hash) {
    document.querySelectorAll(".navbar-item[href^='#/']").forEach((link) => {
      link.classList.toggle("is-active", link.getAttribute("href") === hash);
    });
  }

  window.addEventListener("load", renderRoute);
  window.addEventListener("hashchange", renderRoute);
}
