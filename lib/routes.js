import { readdir } from "fs/promises";
import { Text } from "../components/Text.js";
import { View } from "../components/View.js";
import { render } from "./ui.js";
import express from "express";
import { chownSync, existsSync, readFileSync } from "fs";

export async function registerRoutes(path) {
  async function getRoutes(path, order = 0) {
    const files = await readdir(path);
    let routes = {};
    for (let file of files) {
      let slug;

      if (file.endsWith(".js")) {
        slug = file.substring(0, file.length - 3);
        console.log(slug);
      } else if (!file.endsWith(".html")) {
        slug = file;
        // } else {
        //   slug = "";
      }
      if (slug === "index") slug = "";
      if (slug?.startsWith("_")) {
        console.log(slug, "continue");
        continue;
      }

      if (file.endsWith(".js")) {
        const module = await import(path + "/" + file);
        let __order = 0;
        if (file.startsWith("*")) {
          __order = 1000 - order;
        }
        if (file.startsWith(":")) {
          __order = 1;
        }

        routes[slug] = { ...module, __order, leaf: true };
      } else if (!file.endsWith(".html")) {
        routes[slug] = await getRoutes(path + "/" + file, order + 2);
      }
    }
    return { ...routes, leaf: false };
  }

  function flatRoutes(routes, base = "") {
    let result = [];

    Object.keys(routes).map((slug) => {
      console.log(slug);
      if (routes[slug].leaf) {
        const { __order: order, leaf, ...module } = routes[slug];
        result.push({
          slug: base + "/" + slug,
          order,
          module,
        });
      } else {
        const result2 = flatRoutes(routes[slug], base + "/" + slug);
        result = [...result, ...result2];
      }

      return result.sort((a, b) => {
        return a.order > b.order ? 1 : -1;
      });
    });
    console.log({ result });
    return result;
  }

  let router = express.Router();
  const flattedRoutes = flatRoutes(await getRoutes(path));
  for (let route of flattedRoutes) {
    console.log(route.slug, route.module);

    router.use(getPageRouter(route.slug, route.module));
  }
  return router;
}
// let result2 = flatRoutes(routes[slug], base + "/" + slug);
// result = [...result, ...result2];

// if (routes[slug].actions) {
//   Object.keys(routes[slug].actions).map((key) => {
//     result.push({
//       slug: base + "/" + slug + "$" + key,
//       method: "post",
//       order: routes[slug].__order,
//       handler: async (req, res) => {
//         const action = routes[slug].actions[key];
//         const body = { ...req.params, ...req.body };

//         const output = await action(body);
//         res.send(output);
//       },
//     });
//   });
// }

// if (routes[slug].default) {
//   result.push({
//     slug: base + "/" + slug,
//     method: "get",
//     order: routes[slug].__order,
//     handler: async (req, res) => {
//       var fullUrl =
//         req.protocol + "://" + req.get("host") + req.originalUrl;
//       const url = new URL(fullUrl);

//       const css = routes[slug].css ?? "";
//       const js = routes[slug].js ?? "";

//       const load =
//         routes[slug].load ?? ((props) => Promise.resolve(props));
//       const component = routes[slug].default;

//       let props = {};
//       if (load) {
//         props = await load({ url, params: req.params });
//       }
//       if (!component) {
//         component = View({ slot: Text({ text: "404" }) });
//       }

//       function html(render, slot) {
//         let file;
//         if (existsSync(path + "/" + "index.html")) {
//           file = readFileSync(path + "/index.html", "utf-8");
//         } else {
//           file =
//             "<!DOCTYPE html><html><head>%%head%%</head><body>%%body%%</body></html>";
//         }
//         const body = render(slot);
//         file = file.replace(
//           "%%head%%",
//           css ? `<style>${css}</style>` : ""
//         );
//         return file.replace(
//           "%%body%%",
//           body + (js ? `<script>${js}</script>` : "")
//         );
//       }

//       res.send(
//         render(component({ url, params: req.params, ...props }), html)
//       );
//     },
//   });
// } else {
// }
// });

//   const routes = await getRoutes(path);

//   let router = express.Router();

//   for (let route of flatRoutes(routes)) {
//     router[route.method](route.slug, route.handler);
//   }

//   return router;
// }

export function getPageRouter(slug, page) {
  const routes = express.Router();

  const {
    actions = {},
    js = "",
    css = "",
    load = () => ({}),
    default: component = () => ({}),
  } = page;

  if (actions) {
    Object.keys(actions).map((key) => {
      routes.get(slug + "_" + key, async (req, res) => {
        const action = routes[slug].actions[key];
        const body = { ...req.params, ...req.body };

        const output = await action(body);
        res.send(output);
      });
    });
  }

  routes.get(slug, async (req, res) => {
    var fullUrl = req.protocol + "://" + req.get("host") + req.originalUrl;
    const url = new URL(fullUrl);

    let props = {};
    if (load) {
      props = await load({ url, params: req.params });
    }
    if (!component) {
      component = View({ slot: Text({ text: "404" }) });
    }

    // file = file.replace("%%head%%", css ? `<style>${css}</style>` : "");
    //   return file.replace(
    //     "%%body%%",
    //     body + (js ? `<script>${js}</script>` : "")
    //   );
    const rendered = render(component({ url, params: req.params, ...props }));
    console.log("render", rendered);
    res.send(rendered);
  });

  return routes;
}
