import { tag } from "../lib/ui.js";

export function Button({ ...props }) {
  let className = "y-button";

  if (props.color) {
    className += " y-button-color-" + props.color;
  }
  if (props.size) {
    className += " y-button-size-" + props.size;
  }

  return tag("button", { class: className.trim(), ...props });
}

export function ButtonList({ ...props }) {
  return tag("div", { class: "y-el y-el-d-flex y-el-gap-2", ...props });
}
