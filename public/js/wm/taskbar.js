import { bringToFront } from "./window.js";

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
  btn.addEventListener("click", () => bringToFront(win));
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
