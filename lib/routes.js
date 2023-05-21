import { readdir } from "fs/promises";
import { Text } from "../components/Text.js";
import { View } from "../components/View.js";
import { render, renderReset } from "./ui.js";
import express from "express";
import { join } from "path";

function compose(...layouts) {
  return (props) => {
    let result = props

    for(let i=layouts.length; i > 0; i--) {
      const layout = layouts[i-1]

      result = { 
        slot: layout(result)
      }
    }
    console.log(result)
    return result.slot

  }
}

export async function registerRoutes(path) {
  let layouts = []
  async function getRoutes(path, order = 0) {
    const files = await readdir(path);
    let routes = {};
    if(files.includes('_.js')) {
      const layout = await import('file://' + join(path, '_.js'))
      console.log('layout file...', layout)
      layouts.push(layout)
      console.log('push')

    }
    for (let file of files) {
      let slug;

      if (file.endsWith(".js")) {
        slug = file.substring(0, file.length - 3);
      } else if (!file.endsWith(".html")) {
        slug = file;
      }
      if (slug === "index") slug = "";
      if (slug === "+") slug = "*";
      if(slug  === '_') {
        continue;
      }
      if (slug?.startsWith("_")) slug = slug.replace('_', ':')

      if (file.endsWith(".js")) {
        const module = await import('file://' + join(path, file));
        let __order = 0;
        if (file.startsWith("+")) {
          __order = 1000 - order;
        }
        // if(file === '_.js') {
        //   // 
        //   console.log('layout', module)
        // }
        if (file.startsWith("_")) {
          __order = 1;
        }

        console.log('layouts: ', layouts)
        routes[slug] = { module, layouts: layouts.map(layout => layout.default), __order, leaf: true };
      } else if (!file.endsWith(".html")) {
        routes[slug] = await getRoutes(join(path, file), order + 2);
      }
    }
    if(files.includes('_.js')) {
      console.log('pop')
      layouts.pop()
    }
    return { ...routes, leaf: false };
  }

  function flatRoutes(routes, base = "") {
    let result = [];

    Object.keys(routes).map((slug) => {
      if (routes[slug].leaf) {
        const { __order: order, layouts, module } = routes[slug];
        console.log(slug, routes[slug].layouts)
        result.push({
          slug: base + "/" + slug,
          order,
          module: {
            ...module,
            default: compose(...layouts, module.default)
          },
          
        });
      } else {
        const result2 = flatRoutes(routes[slug], base + "/" + slug);
        result = [...result, ...result2];
      }

      return result.sort((a, b) => {
        return a.order > b.order ? 1 : -1;
      });
    });
    return result;
  }

  let router = express.Router();
  const flattedRoutes = flatRoutes(await getRoutes(path));
  for (let route of flattedRoutes) {

    router.use(getPageRouter(route.slug, route.module));
  }
  return router;
}

export function getPageRouter(slug, page) {
  const routes = express.Router();

  const {
    actions = {},
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
      component = View({ slot: Text({ text: "404" }) })
      
    }


    renderReset()
    const html = render(component({ url, params: req.params, ...props }));

    console.log(html)
    res.send(html);
  });

  return routes;
}
