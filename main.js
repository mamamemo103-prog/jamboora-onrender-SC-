(() => {
  const header = document.querySelector(".jb-header");
  const burger = document.querySelector(".jb-menu");
  const nav = document.querySelector("#jb-nav");

  if (header && burger && nav) {
    burger.addEventListener("click", () => {
      const on = header.classList.toggle("is-open");
      burger.setAttribute("aria-expanded", on ? "true" : "false");
    });

    nav.addEventListener("click", (e) => {
      const t = e.target;
      if (t && t.tagName === "A") {
        header.classList.remove("is-open");
        burger.setAttribute("aria-expanded", "false");
      }
    });
  }

  const filters = [...document.querySelectorAll("[data-jb-filter]")];
  const rows = [...document.querySelectorAll("[data-jb-cat]")];

  const applyFilter = (key) => {
    rows.forEach((row) => {
      const cat = row.getAttribute("data-jb-cat");
      row.hidden = !(key === "all" || cat === key);
    });

    filters.forEach((btn) => {
      const f = btn.getAttribute("data-jb-filter");
      btn.setAttribute("aria-pressed", f === key ? "true" : "false");
    });
  };

  filters.forEach((btn) => {
    btn.addEventListener("click", () => {
      applyFilter(btn.getAttribute("data-jb-filter"));
    });
  });

  const hash = String(location.hash || "")
    .replace(/^#/, "")
    .toLowerCase();
  const valid = new Set(["slots", "roulette", "blackjack", "poker", "wheel"]);
  if (filters.length && rows.length) {
    applyFilter(valid.has(hash) ? hash : "all");
  }

  const observer = new IntersectionObserver(
    (entries) =>
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("is-visible");
      }),
    { threshold: 0.12, rootMargin: "0px 0px -12% 0px" }
  );

  document.querySelectorAll(".jb-reveal").forEach((el) => observer.observe(el));

  document.querySelectorAll(".js-year").forEach((el) => {
    el.textContent = String(new Date().getFullYear());
  });
})();
