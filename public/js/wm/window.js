import { makeDraggable } from "./drag.js";

let zCounter = 1;

export function createWindow({ title, content, x = 60, y = 60 }) {
  const win = document.createElement("div");
  win.className = "window";
  win.style.left = `${x}px`;
  win.style.top = `${y}px`;

  win.addEventListener("pointerdown", () => bringToFront(win));

  win.innerHTML = `
    <div class="titlebar">
      <span class="titlebar-title"></span>
      <div class="titlebar-buttons">
        <button aria-label="minimize">_</button>
        <button aria-label="maximize">□</button>
        <button aria-label="close">×</button>
      </div>
    </div>
    <div class="menubar">
      <span>File</span> <span>Edit</span> <span>View</span> <span>Help</span>
    </div>
    <div class="window-content"></div>
  `;

  win.querySelector(".titlebar-title").textContent = title;
  win.querySelector(".window-content").append(content);

  win.querySelector('[aria-label="close"]').addEventListener("click", () => {
    win.remove();
    document.dispatchEvent(new CustomEvent("wm:close", { detail: { win } }));

    const survivors = [...document.querySelectorAll(".window")];
    if (survivors.length === 0) {
      return;
    }

    let top = survivors[0];
    for (const w of survivors) {
      if (Number(w.style.zIndex) > Number(top.style.zIndex)) {
        top = w;
      }
    }
    bringToFront(top);
  });

  document.querySelector(".desktop").append(win);
  document.dispatchEvent(
    new CustomEvent("wm:open", { detail: { win, title } }),
  );
  bringToFront(win);
  makeDraggable(win);
  return win;
}

export function bringToFront(win) {
  win.style.zIndex = ++zCounter;

  document
    .querySelectorAll(".window")
    .forEach((w) => w.classList.remove("focused"));
  win.classList.add("focused");
  document.dispatchEvent(new CustomEvent("wm:focus", { detail: { win } }));
}
