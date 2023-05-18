import { tag } from "../lib/ui.js";

export function Text({ text, tag: tagName = "span", ...props }) {
  if (typeof text !== "undefined") props.slot = text;
  return tag(tagName, { ...props });
}
