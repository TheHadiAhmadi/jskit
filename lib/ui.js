export function render(object, layout) {
  console.log("render", object, layout);
  if (layout) {
    const result = layout(render, object);
    console.log(result);
    return result;
  }
  if (typeof object === "string" || typeof object === "number") {
    return object;
  }

  if (Array.isArray(object)) {
    return object.map((component) => render(component)).join("");
  }

  const { tag, slot, props = {} } = object;
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

export function tag(tag, { slot, ...props }) {
  return {
    tag,
    props,
    slot,
  };
}
