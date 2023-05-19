import { tag } from "../lib/ui.js";
import { Text } from "./Text.js";
import { View } from "./View.js";

export function SidebarItem({ title, href, slot, ...props }) {
  return View({
    class: "y-sidebar-item-wrapper",
    "x-data": "{open: false}",
    slot: [
      tag("a", {
        href: slot ? undefined : href,
        "x-on:click": "open = !open",
        class: "y-sidebar-item",
        slot: Text({ text: title }),
      }),
      slot &&
        View({
          ":class": "open ? 'y-el-d-block' : ''",
          class: "y-sidebar-item-menu",
          slot,
        }),
    ],
    ...props,
  });
}

export function Sidebar({ slot, ...props }) {
  return View({
    style: "margin-top: 56px",
    class: "y-sidebar-wrapper y-sidebar-wrapper-theme-dark",
    slot: View({
      class: "y-sidebar",
      slot: View({
        class: "y-sidebar-content",
        slot,
      }),
    }),
  });
}
