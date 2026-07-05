import { bringToFront, restoreWindow, focusTopmost } from "./window.js";
import { APPS } from "../apps/registry.js";

const clock = document.querySelector(".taskbar-clock");
const windowButtons = new Map();
const windowsEl = document.querySelector(".taskbar-windows");

function tick() {
  clock.textContent = new Date().toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });
}
tick();
setInterval(tick, 30_000);

document.addEventListener("wm:open", (e) => {
  const { win, title } = e.detail;
  const btn = document.createElement("button");
  btn.className = "task-btn";
  btn.textContent = title;

  btn.addEventListener("click", () => {
    if (win.classList.contains("minimized")) {
      restoreWindow(win);
    } else if (win.classList.contains("focused")) {
      win.classList.add("minimized");
      document.dispatchEvent(
        new CustomEvent("wm:minimize", { detail: { win } }),
      );
      focusTopmost();
    } else {
      bringToFront(win);
    }
  });

  windowsEl.append(btn);
  windowButtons.set(win, btn);
});

document.addEventListener("wm:close", (e) => {
  const btn = windowButtons.get(e.detail.win);
  if (btn) {
    btn.remove();
    windowButtons.delete(e.detail.win);
  }
});

document.addEventListener("wm:focus", (e) => {
  for (const btn of windowButtons.values()) {
    btn.classList.remove("active");
  }
  windowButtons.get(e.detail.win)?.classList.add("active");
});

const startBtn = document.querySelector(".start-btn");
const startMenu = document.querySelector(".start-menu");
const startItems = document.querySelector(".start-items");

startBtn.addEventListener("click", () => {
  startMenu.classList.toggle("open");
});

document.addEventListener("click", (e) => {
  if (!e.target.closest(".start-menu, .start-btn")) {
    startMenu.classList.remove("open");
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") startMenu.classList.remove("open");
});

for (const app of Object.values(APPS)) {
  const item = document.createElement("button");
  item.className = "start-item";
  item.textContent = `${app.glyph}  ${app.title}`;
  item.addEventListener("click", () => {
    app.open();
    startMenu.classList.remove("open");
  });
  startItems.append(item);
}
