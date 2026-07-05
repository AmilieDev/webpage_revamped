import { createWindow } from "../wm/window.js";

export function openSpecs() {
  const content = document.createElement("div");
  content.className = "about-text";
  content.innerHTML = `
    <h2>My devices <3</h2>
`;

  const specsPC = document.createElement("details");
  specsPC.className = "badge-share";
  specsPC.innerHTML = `
    <summary>My desktop!</summary>
    <div class="badge-share-body irc-body">
      <div class="irc-info">
        <p>CPU: Ryzen 5 9800X3D</p>
        <p>GPU: RTX 3080</p>
        <p>RAM: 32GB DDR5 @ 6000MHz</p>
        <p>NVMe: 2TB 5GB/s M.2 NVMe</p>
      </div>
    </div>
  `;

  const specsMac = document.createElement("details");
  specsMac.className = "badge-share";
  specsMac.innerHTML = `
    <summary>My Mac!</summary>
    <div class="badge-share-body irc-body">
      <div class="irc-info">
        <p>Model: 2023 MacBook Pro 14"</p>
        <p>CPU: M3 Pro</p>
        <p>RAM: 18GB Unified</p>
        <p>NVMe: 512GB</p>
      </div>
    </div>
  `;
  const footNote = document.createElement("div");
  footNote.className = "about-text";
  footNote.innerHTML = `
    <br>
        <p class="irc-note">These specs are accurate as of July 5th 2026</p>
    `;

  content.append(specsPC, specsMac, footNote);

  createWindow({
    title: "specs.fetch",
    content,
  });
}
