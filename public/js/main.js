import { createWindow } from "./wm/window.js";
import { openBlog } from "./apps/blog.js";
import { openLinks } from "./apps/links.js";
import { createIcon } from "./wm/icons.js";
import "./wm/taskbar.js";
import { openAbout } from "./apps/about.js";
import { open88x31 } from "./apps/88x31.js";

createIcon({
  label: "about_me.txt",
  glyph: "👋",
  x: 24,
  y: 24,
  onOpen: openAbout,
});
createIcon({
  label: "links.txt",
  glyph: "🔗",
  x: 24,
  y: 110,
  onOpen: openLinks,
});
createIcon({ label: "blog.sh", glyph: "📝", x: 24, y: 196, onOpen: openBlog });
createIcon({
  label: "88x31.zip",
  glyph: "🍤",
  x: 24,
  y: 282,
  onOpen: open88x31,
});
