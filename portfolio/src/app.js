const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".primary-nav");

if (toggle && nav) {
  const setMenu = expanded => {
    toggle.setAttribute("aria-expanded", String(expanded));
    toggle.setAttribute("aria-label", expanded ? "Close navigation" : "Open navigation");
    nav.classList.toggle("is-open", expanded);
  };
  toggle.addEventListener("click", () => {
    const expanded = toggle.getAttribute("aria-expanded") === "true";
    setMenu(!expanded);
  });
  nav.addEventListener("click", event => {
    if (event.target.closest("a")) {
      setMenu(false);
    }
  });
  document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
      setMenu(false);
      toggle.focus();
    }
  });
}

document.querySelectorAll(".project-visual img").forEach(image => {
  image.addEventListener("error", () => image.closest(".project-visual")?.remove(), { once: true });
});

document.querySelectorAll("[data-year]").forEach(element => {
  element.textContent = String(new Date().getFullYear());
});
