import { createWindow } from "../wm/window.js";

export function openAbout() {
  const content = document.createElement("div");
  content.className = "about-text";
  content.innerHTML = `
    <h2>Who am I!</h2>
    <p>
      I'm an 18 year old hobbyist software developer going into cybersecurity.
      I've worked on a range of projects from amilie.dev to amiOS
      (my custom implementation of an OS).
    </p>
    <p>
      I write in both English and Dutch, but I'm British. This is more a way
      for me to just share some funny stuff I see online, or anything I may be
      interested in. Pay no serious attention to anything I write as it's
      usually just yapping bullshit, but if you do decide to stick around —
      thank you, I'm sure my yapping will keep you somewhat entertained :).
    </p>
    <p>This website is directly interlinked with my blog — kinda cool right?</p>
  `;

  createWindow({ title: "about_me.txt", content, x: 100, y: 80 });
}
