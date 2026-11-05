document.addEventListener("DOMContentLoaded", function () {
  const burger = document.getElementById("burger");
  const menu = document.getElementById("menu");
  const navbar = document.getElementById("navbar");
  const liens = document.querySelectorAll(".menu a");

  // Menu mobile
  burger.addEventListener("click", function () {
    const ouvert = menu.classList.toggle("ouvert");
    burger.classList.toggle("ouvert", ouvert);
    burger.setAttribute("aria-expanded", ouvert);
  });

  // Défilement en douceur
  liens.forEach(function (lien) {
    lien.addEventListener("click", function (e) {
      const cible = document.querySelector(lien.getAttribute("href"));
      if (cible) {
        e.preventDefault();
        const y = cible.getBoundingClientRect().top + window.scrollY - navbar.offsetHeight + 1;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
      menu.classList.remove("ouvert");
      burger.classList.remove("ouvert");
      burger.setAttribute("aria-expanded", "false");
    });
  });

  // Lien actif selon la section
  const sections = document.querySelectorAll("main section");
  function majNav() {
    let courant = "";
    sections.forEach(function (s) {
      if (window.scrollY >= s.offsetTop - navbar.offsetHeight - 80) courant = s.id;
    });
    liens.forEach(function (l) {
      l.classList.toggle("actif", l.getAttribute("href") === "#" + courant);
    });
  }
  window.addEventListener("scroll", majNav);
  majNav();

  // Apparition animée des sections
  const elements = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const obs = new IntersectionObserver(function (entrees) {
      entrees.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("visible"); obs.unobserve(e.target); }
      });
    }, { threshold: 0.15 });
    elements.forEach(function (el) { obs.observe(el); });
  } else {
    elements.forEach(function (el) { el.classList.add("visible"); });
  }

  // Année automatique
  document.getElementById("annee").textContent = new Date().getFullYear();
});