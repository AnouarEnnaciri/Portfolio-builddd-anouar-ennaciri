(() => {
  "use strict";

  const root = document.documentElement;
  const header = document.getElementById("site-header");
  const menuBtn = document.getElementById("menu-btn");
  const menu = document.getElementById("mobile-menu");

  /* ---------- mobile menu ---------- */

  function setMenu(open) {
    menuBtn.setAttribute("aria-expanded", String(open));
    menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    menu.hidden = !open;
  }

  menuBtn.addEventListener("click", () => {
    setMenu(menuBtn.getAttribute("aria-expanded") !== "true");
  });

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setMenu(false));
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menuBtn.getAttribute("aria-expanded") === "true") {
      setMenu(false);
      menuBtn.focus();
    }
  });

  window.matchMedia("(min-width: 961px)").addEventListener("change", (event) => {
    if (event.matches) setMenu(false);
  });

  /* ---------- header border + scroll progress rail ---------- */

  let ticking = false;

  function onScroll() {
    const max = root.scrollHeight - window.innerHeight;
    const progress = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
    root.style.setProperty("--p", progress.toFixed(4));
    header.classList.toggle("is-scrolled", window.scrollY > 8);
    ticking = false;
  }

  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(onScroll);
      }
    },
    { passive: true }
  );
  window.addEventListener("resize", onScroll, { passive: true });
  onScroll();

  /* ---------- current section in nav + rail ---------- */

  const sections = Array.from(document.querySelectorAll("main section[id]"));
  const navLinks = Array.from(
    document.querySelectorAll(".nav-desktop a, .nav-mobile a, .rail a")
  );

  function setActive(id) {
    navLinks.forEach((link) => {
      if (link.getAttribute("href") === "#" + id) {
        link.setAttribute("aria-current", "true");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }

  if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );
    sections.forEach((section) => sectionObserver.observe(section));
  } else {
    setActive("profile");
  }

  /* ---------- draw diagram connectors once, when they enter view ---------- */

  const diagrams = Array.from(document.querySelectorAll(".sec-fig"));

  if ("IntersectionObserver" in window) {
    const drawObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-drawn");
            drawObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.35 }
    );
    diagrams.forEach((figure) => drawObserver.observe(figure));
  } else {
    diagrams.forEach((figure) => figure.classList.add("is-drawn"));
  }
})();