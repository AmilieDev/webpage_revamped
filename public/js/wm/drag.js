export function makeDraggable(win) {
  const titlebar = win.querySelector(".titlebar");
  let offsetX = 0;
  let offsetY = 0;

  titlebar.addEventListener("pointerdown", (e) => {
    if (e.target.closest("button")) return;

    e.preventDefault();
    offsetX = e.clientX - win.offsetLeft;
    offsetY = e.clientY - win.offsetTop;

    titlebar.setPointerCapture(e.pointerId);
    titlebar.addEventListener("pointermove", onMove);
    titlebar.addEventListener("pointerup", onUp);
  });

  function onMove(e) {
    const maxTop = win.parentElement.clientHeight - 32;
    win.style.left = `${e.clientX - offsetX}px`;
    win.style.top = `${Math.max(0, Math.min(e.clientY - offsetY, maxTop))}px`;
  }

  function onUp(e) {
    titlebar.releasePointerCapture(e.pointerId);
    titlebar.removeEventListener("pointermove", onMove);
    titlebar.removeEventListener("pointerup", onUp);
  }
}
