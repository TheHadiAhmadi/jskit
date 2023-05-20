import express from "express";
import { registerRoutes } from "./lib/routes.js";
import path from "path";

import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();

app.use(express.static(path.join(__dirname, "./public")));
app.use(express.json());

registerRoutes(path.join(__dirname, "./pages")).then((routes) => {
  app.use(routes);
  const port = process.env.PORT ?? 3002;

  app.listen(port, () => {
    console.log("listening on port: " + port);
  });
});
