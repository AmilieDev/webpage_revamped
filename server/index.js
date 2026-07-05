import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
import * as cheerio from "cheerio";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const FEED_URL = "https://blog.amilie.dev/feed/";
const FEED_UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36";

const app = express();

let cachedPosts = null;
let cachedAt = 0;
const TTL_MS = 15 * 60 * 1000;

app.use(express.static(path.join(__dirname, "..", "public")));

app.get("/api/posts", async (req, res) => {
  if (cachedPosts !== null && Date.now() - cachedAt < TTL_MS) {
    return res.json({ posts: cachedPosts });
  }

  try {
    const upstream = await fetch(FEED_URL, {
      headers: { "User-Agent": FEED_UA },
    });
    if (!upstream.ok) {
      return res
        .status(502)
        .json({ error: `Upstream Returned: ${upstream.status}` });
    }
    const xml = await upstream.text();
    const $ = cheerio.load(xml, { xml: true });

    const posts = $("entry")
      .map((i, el) => ({
        title: $(el).find("title").text(),
        url: $(el).find("link").attr("href"),
        date: $(el).find("published").text(),
      }))
      .get();

    cachedPosts = posts;
    cachedAt = Date.now();
    res.json({ posts });
  } catch (err) {
    console.error(err);
    res.status(502).json({ error: "Couldn't reach the blog." });
  }
});

app.listen(3000, () => {
  console.log("listening on http://localhost:3000/");
});
