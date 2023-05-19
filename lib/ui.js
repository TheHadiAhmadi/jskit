export function render(object) {
  console.log(object);
  if (typeof object === "undefined") return "";
  if (typeof object === "string" || typeof object === "number") {
    return object;
  }

  if (Array.isArray(object)) {
    return object.map((component) => render(component)).join("");
  }

  const { tag, slot, props = {} } = object;

  if (tag === "html") {
    return object.content;
  }

  let attributes = "";

  Object.keys(props).map((key) => {
    if (!props[key]) return;
    attributes += " " + key + '="' + props[key] + '"';
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

export function html(template, data) {
  let rendered = template;
  for (let key of Object.keys(data)) {
    console.log("replace", key, data[key]);
    rendered = rendered.replace(`%%${key}%%`, render(data[key]));
  }
  console.log(rendered);
  return {
    tag: "html",
    content: rendered,
  };
}

export function tag(tag, { slot, ...props }) {
  return {
    tag,
    props,
    slot,
  };
}
