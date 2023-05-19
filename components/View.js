import { tag } from "../lib/ui.js";

export function View({ p, m, mb, gap, column, justify, align, ...props }) {
  let className = "y-el y-el-d-flex";
  props.style ??= "";
  if (column) {
    props.style += "; flex-direction: column";
  }
  if (p) {
    className += " y-el-p-" + p;
  }
  if (justify) {
    className += " y-el-justify-content-" + justify;
  }
  if (align) {
    className += " y-el-align-items-" + align;
  }
  if (m) {
    className += " y-el-m-" + m;
  }
  if (mb) {
    className += " y-el-mb-" + mb;
  }
  if (gap) {
    className += " y-el-gap-" + gap;
  }

  console.log("View", props);

  return tag("div", { class: className.trim(), ...props });
}
