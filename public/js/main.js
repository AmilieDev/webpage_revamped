import { createWindow } from "./wm/window.js";
import { openBlog } from "./apps/blog.js";
import { openLinks } from "./apps/links.js";
import { createIcon } from "./wm/icons.js";
import "./wm/taskbar.js";
import { openAbout } from "./apps/about.js";
import { open88x31 } from "./apps/88x31.js";
import { APPS } from "./apps/registry.js";

for (const app of Object.values(APPS)) {
  createIcon({
    label: app.title,
    glyph: app.glyph,
    x: app.x,
    y: app.y,
    onOpen: app.open,
  });
}
