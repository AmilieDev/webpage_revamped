import "./wm/taskbar.js";
import { APPS } from "./apps/registry.js";
import { createIcon } from "./wm/icons.js";

for (const app of Object.values(APPS)) {
  createIcon({
    label: app.title,
    glyph: app.glyph,
    x: app.x,
    y: app.y,
    onOpen: app.open,
  });
}
