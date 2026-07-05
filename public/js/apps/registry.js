import { openAbout } from "./about.js";
import { openLinks } from "./links.js";
import { openBlog } from "./blog.js";
import { open88x31 } from "./88x31.js";

export const APPS = {
  about: { title: "about_me.txt", glyph: "👋", x: 24, y: 24, open: openAbout },
  links: { title: "links.txt", glyph: "🔗", x: 24, y: 110, open: openLinks },
  blog: { title: "blog.sh", glyph: "📝", x: 24, y: 196, open: openBlog },
  badges: { title: "88x31.zip", glyph: "🦐", x: 24, y: 282, open: open88x31 },
};
