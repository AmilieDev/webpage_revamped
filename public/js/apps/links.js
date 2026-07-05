import { createWindow } from "../wm/window.js";

const LINKS = [
  { label: "Follow my blog!", url: "https://blog.amilie.dev/" },
  { label: "And check out my GitHub!", url: "https://github.com/amiliedev/" },
];

const IRC_SERVER = "irc.amilie.dev:6697";

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

  const irc = document.createElement("details");
  irc.className = "badge-share";
  irc.innerHTML = `
  <summary> Join me on IRC!</summary>
  <div class="badge-share-body irc-body">
    <div class="irc-info">
      <p>Server IP: <code>${IRC_SERVER}</code></p>
      <p>TLS Required To Connect</p>
      <p>Registration NOT Required</p>
      <p class="irc-note">(Your IP is never exposed)</p>
    </div>
  </div>
`;

  content.append(irc);

  createWindow({ title: "links.txt", content, x: 220, y: 120 });
}
