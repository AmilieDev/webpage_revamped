import { createWindow } from "../wm/window.js";

const LINKS = [
  { label: "Follow my blog!", url: "https://blog.amilie.dev/" },
  { label: "And checkout my GitHub!", url: "https://github.com/amiliedev/" },
  { label: "And join me on IRC!", url: "ircs://irc.amilie.dev:6697" },
];

export function openLinks() {
  const content = document.createElement("div");
  content.className = "link-list";

  const intro = document.createElement("p");
  intro.textContent = "You can find me on the following platforms!";
  content.append(intro);

  for (const link of LINKS) {
    const a = document.createElement("a");
    a.className = "link";
    a.href = link.url;
    a.target = "_blank";
    a.rel = "noopener";

    const title = document.createElement("span");
    title.className = "link-title";
    title.textContent = link.label;

    a.append(title);
    content.append(a);
  }

  createWindow({ title: "links.txt", content, x: 220, y: 120 });
}
