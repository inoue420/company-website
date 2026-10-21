"use strict";

(() => {
  const menu = document.querySelector(".sbg-menu");
  const toc = document.querySelector(".sbg-toc");
  if (menu && toc) {
    toc.dataset.collapsed = "true";
    menu.hidden = false;
    menu.addEventListener("click", () => {
      const expanded = menu.getAttribute("aria-expanded") !== "true";
      menu.setAttribute("aria-expanded", String(expanded));
      toc.dataset.collapsed = String(!expanded);
    });
    toc.addEventListener("click", (event) => {
      if (!event.target.closest("a")) return;
      menu.setAttribute("aria-expanded", "false");
      toc.dataset.collapsed = "true";
    });
  }

  const headerMenu = document.querySelector(".c-navIcon");
  const headerLinks = document.querySelector(".c-globalNav_list");
  if (headerMenu && headerLinks) {
    headerMenu.addEventListener("click", () => {
      const expanded = headerMenu.getAttribute("aria-expanded") !== "true";
      headerMenu.setAttribute("aria-expanded", String(expanded));
      headerMenu.classList.toggle("active", expanded);
      headerLinks.style.display = expanded ? "flex" : "";
    });
  }

  const search = document.getElementById("faq-search");
  const entries = [...document.querySelectorAll(".sbg-faq")];
  const status = document.getElementById("faq-status");
  if (search) {
    search.closest(".sbg-search").hidden = false;
    search.addEventListener("input", () => {
      const terms = search.value.normalize("NFKC").toLocaleLowerCase("ja").trim().split(/\s+/).filter(Boolean);
      let count = 0;
      for (const entry of entries) {
        const text = `${entry.textContent} ${entry.dataset.keywords || ""}`.normalize("NFKC").toLocaleLowerCase("ja");
        const visible = terms.every((term) => text.includes(term));
        entry.hidden = !visible;
        if (terms.length && visible) entry.open = true;
        if (visible) count++;
      }
      status.textContent = terms.length ? `${count}件の質問が見つかりました。` : `全${entries.length}件の質問を表示しています。`;
    });
  }

  let printState = [];
  window.addEventListener("beforeprint", () => {
    printState = entries.map((entry) => ({ open: entry.open, hidden: entry.hidden }));
    entries.forEach((entry) => { entry.open = true; entry.hidden = false; });
  });
  window.addEventListener("afterprint", () => {
    entries.forEach((entry, index) => {
      if (!printState[index]) return;
      entry.open = printState[index].open;
      entry.hidden = printState[index].hidden;
    });
  });
  const printButton = document.getElementById("print-guide");
  if (printButton) {
    printButton.hidden = false;
    printButton.addEventListener("click", () => window.print());
  }
})();
