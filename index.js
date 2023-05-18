import express from "express";
import { pages } from "./lib/routes.js";
import { readFileSync } from "fs";
import path from "path";

import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

function layout(render, slot) {
  let file = readFileSync("./index.html", "utf-8");
  const body = render(slot);
  file = file.replace("%%head%%", "");
  return file.replace("%%body%%", body);
}

const app = express();

app.use(express.static(path.join(__dirname, "./public")));

pages(path.join(__dirname, "./pages"), layout).then((pagesMiddleware) => {
  app.use(pagesMiddleware);
  const port = process.env.PORT ?? 3002;

  app.listen(port, () => {
    console.log("listening on port: " + port);
  });
});
