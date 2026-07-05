import { createWindow } from "../wm/window.js";

export function openBlog() {
  const content = document.createElement("div");
  content.textContent = "Loading Blog...";

  content.className = "post-list";

  createWindow({ title: "blog.sh", content, x: 140, y: 100 });

  loadPosts(content);
}

async function loadPosts(content) {
  try {
    const res = await fetch("/api/posts");

    if (!res.ok) {
      content.textContent = `Couldn't load posts! (${res.status})`;
      return;
    }
    const data = await res.json();

    content.textContent = "";
    for (const post of data.posts) {
      const a = document.createElement("a");
      a.className = "post-link";
      a.href = post.url;
      a.target = "_blank";
      a.rel = "noopener";

      const title = document.createElement("span");
      title.className = "post-title";
      title.textContent = post.title;

      const meta = document.createElement("span");
      meta.className = "post-meta";
      const date = new Date(post.date).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
      meta.textContent = `${date} · Amilie`;

      a.append(title, meta);
      content.append(a);
    }
  } catch (err) {
    console.error(err);
    content.textContent("Posts failed to load.");
  }
}
