import { tag } from "../lib/ui.js";

export function View({ padding, margin, ...props }) {
  let className = "";
  if (padding) {
    className += " p-" + padding;
  }
  if (margin) {
    className += " m-" + margin;
  }
  console.log('View', props)

  return tag("div", { class: className.trim(), ...props });
}
