function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");

  const isOpen = menu.classList.toggle("open");
  icon.classList.toggle("open");
  icon.setAttribute("aria-expanded", String(isOpen));
}

function downloadCV() {
  const link = document.createElement("a");

  link.href = "./assets/CV_PFA_2026_Ennaciri_Anouar.pdf";
  link.download = "Anouar_Ennaciri_CV.pdf";

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.12,
  }
);

document.querySelectorAll(".reveal").forEach((element) => {
  revealObserver.observe(element);
});