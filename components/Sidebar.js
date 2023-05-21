import { tag } from "../lib/ui.js";
import { Text } from "./Text.js";
import { View } from "./View.js";

export function SidebarItem({ title, href, slot, ...props }) {
  return View({
    class: "y-sidebar-item-wrapper",
    'u-sidebar-item': function (el) {
      el.querySelector('[u-sidebar-item-toggle]').addEventListener('click', e => {
        el.querySelector('[u-sidebar-item-menu]').classList.toggle('y-el-d-block');
      }) 
    },
    slot: [
      tag("a", {
        href: slot ? undefined : href,
        'u-sidebar-item-toggle': true,
        class: "y-sidebar-item",
        slot: Text({ text: title }),
      }),
      slot &&
        View({
          'u-sidebar-item-menu': true,
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
