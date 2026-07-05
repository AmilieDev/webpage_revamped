import { createWindow } from "../wm/window.js";

const BADGE_URL = "https://amilie.dev/assets/88x31.gif";

export function open88x31() {
  const BADGES = [
    {
      img: "https://electron271.gay/88x31/badgev1.webp",
      url: "https://electron271.gay",
      alt: "electron271.gay 88x31 badge.",
    },
    {
      img: "https://glocean.dev/badge.png",
      url: "https://glocean.dev",
      alt: "glocean.dev 88x31 badge.",
    },
  ];

  const content = document.createElement("div");
  const intro = document.createElement("p");
  intro.textContent = "Frenssss!! WHOA!! Frens!!!";
  content.append(intro);

  const grid = document.createElement("div");
  grid.className = "badge-grid";

  for (const b of BADGES) {
    const a = document.createElement("a");
    a.href = b.url;
    a.target = "_blank";
    a.rel = "noopener";

    const img = document.createElement("img");
    img.src = b.img;
    img.alt = b.alt;
    img.width = 88;
    img.height = 31;
    img.loading = "lazy";

    a.append(img);
    grid.append(a);
  }

  content.append(grid);
  content.append("\n");

  const snippet = `<a href="https://amilie.dev"><img src="${BADGE_URL}" alt="amilie.dev" width="88" height="31"></a>`;

  const share = document.createElement("details");
  share.className = "badge-share";
  share.innerHTML = `
  <summary> Want to add my 88x31 to your site!?</summary>
  <div class="badge-share-body">
    <img src="${BADGE_URL}" alt="amilie.dev 88x31 badge" width="88" height="31" />
    <button class="copy-badge task-btn">copy</button>
  </div>
`;

  share.querySelector(".copy-badge").addEventListener("click", async () => {
    await navigator.clipboard.writeText(snippet);
    const btn = share.querySelector(".copy-badge");
    btn.textContent = "copied!";
    setTimeout(() => (btn.textContent = "copy"), 1500);
  });
  content.append(share);

  createWindow({ title: "88x31.zip", content, x: 100, y: 80 });
}
