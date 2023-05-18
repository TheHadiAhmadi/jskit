import { readdir } from "fs/promises";
import { render } from "./ui.js";

export async function registerRoutes(path) {
  const files = await readdir(path);

  let routes = {};
  for (let file of files) {
    if (file.endsWith(".js")) {
      let slug = file.substring(0, file.length - 3);
      if (slug === "index") slug = "";

      const module = await import(path + "/" + file);
      routes[slug] = module;
    } else {
      let slug = file;
      if (slug === "index") slug = "";
      routes[slug] = await registerRoutes(path + "/" + file);
    }
  }
  return routes;
}

export function matchRoutes(pathname, routes) {
  console.log("matchRoutes", pathname, Object.keys(routes));

  for (let slug of Object.keys(routes)) {
    if (slug === "index") slug = "";

    console.log("ttt: ", pathname, "/" + slug, "/" + slug + "/");
    console.log("2", pathname.startsWith("/" + slug), slug, pathname);
    if (pathname === "/" + slug || pathname === "/" + slug + "/") {
      console.log("found", pathname, Object.keys(routes));

      return routes[slug];
    } else if (pathname.startsWith("/" + slug + "/")) {
      console.log(
        "seeking..",
        pathname.substring(1 + slug.length),
        Object.keys(routes)
      );

      return matchRoutes(
        pathname.substring(1 + slug.length),
        routes[slug],
        slug
      );
    }
  }
  console.log("not match", pathname, routes);
  return null;
}

export async function pages(path, html) {
  const routes = await registerRoutes(path);

  return (req, res, next) => {
    var fullUrl = req.protocol + "://" + req.get("host") + req.originalUrl;
    const url = new URL(fullUrl);

    let page = matchRoutes(url.pathname, routes);

    if (!page) {
      return next();
    }

    console.log(page);

    if (typeof page === "object" && page[""]) {
      page = page[""];
    }

    const load = page.load ?? ((props) => Promise.resolve(props));
    const component = page.default;
    load({ url }).then((props) => {
      res.send(render(component({ url, ...props }), html));
    });
  };
}
