export function createIcon({ label, glyph, x, y, onOpen }) {
  const icon = document.createElement("button");
  icon.className = "icon";
  icon.style.left = `${x}px`;
  icon.style.top = `${y}px`;

  const glyphEl = document.createElement("span");
  glyphEl.className = "icon-glyph";
  glyphEl.textContent = glyph;

  const labelEl = document.createElement("span");
  labelEl.className = "icon-label";
  labelEl.textContent = label;

  icon.append(glyphEl, labelEl);
  icon.addEventListener("dblclick", onOpen);

  document.querySelector(".desktop").append(icon);
  return icon;
}
