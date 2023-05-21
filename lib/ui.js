import { Script } from "../components/Script.js"

let codes = {}

export function renderReset() {
  codes = {}
}

export function renderGetJs() {
  let js = '\n'
  Object.keys(codes).map(key => {

    const fnName = key.replace(/\-/g, '_')

    js += `// ${fnName} component\n`
    js += '\tconst ' + fnName + ' = ' + codes[key].toString()
    js += `\n\tdocument.querySelectorAll("[${key}]").forEach(el => ${fnName}(el))\n\n\n`
  })

  return js 
}


export function render(object) {
  if (typeof object === "undefined") return "";
  if (typeof object === "string" || typeof object === "number") {
    return object;
  }

  if (Array.isArray(object)) {
    return object.map((component) => render(component)).join("");
  }

  const { tag, slot, props = {} } = object;

 
  if(tag === 'html') {
    const body = render(props.body);
    const title = render(props.title);
    const head = render(props.head);

    console.log({props, body, title, head})
    return html({
      title,
      body: body + render(Script({code: renderGetJs()})),
      head
    })
  }

  let attributes = "";

  Object.keys(props).map((key) => {
    if (typeof props[key] === 'undefined' || props[key] === false) return;

    if(typeof props[key] == 'function') {
      codes[key] = props[key]    
      attributes += ' ' + key;
      return;
    }

    if(props[key] === true) {
      attributes += ' ' + key;
    } else {
      attributes += " " + key + '="' + props[key] + '"';
    }
  });

  let result = `<${tag}${attributes}`;
  if (slot) {
    result += ">";
    if (Array.isArray(slot)) {
      result += slot.map((component) => render(component)).join("");
    } else {
      result += render(slot);
    }
  } else {
    result += ">";
  }
  result += `</${tag}>`;

  return result;
}

export function html({title, head, body}) {
  return `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${title}</title>
      ${head}
  </head>
  <body style="overflow: hidden">    
      ${body}
  </body>
  </html>
  `
}

export function tag(tag, { slot, ...props }) {
  return {
    tag,
    props,
    slot,
  };
}
