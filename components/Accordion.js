import { classname } from "../lib/utils.js";
import { View } from "./View.js";

let id = 0;
// sets context ACCORDION for open close...
export function Accordion({
  componentName = "accordion",
  open = false,
  title,
  slot,
  ...restProps
}) {
  return View({
    componentName,
    ...restProps,
    slot: [title && AccordionHeader({ slot: title }), slot],
  });
}

export function AccordionBody({
  componentName = "accordion-body",
  slot,
  ...restProps
}) {
  let show = "closed"; // from context
  return View({
    componentName,
    ...restProps,
    [classname(componentName)]: ++id,
    cssProps: { show },
    slot: View({
      componentName: componentName + "-inner",
      slot,
    }),
  });
}

export function AccordionHeader({
  componentName = "accordion-header",
  slot,
  ...restProps
}) {
  // let open = false;
  return View({
    ...restProps,
    // show,
    componentName,
    slot: View({
      tag: "button",
      [classname(componentName + "-button")]: id,
      componentName: componentName + "-button",
      cssProps: {
        collapsed: true,
      },
      slot,
    }),
  });
}

export function AccordionTitle({
  componentName = "accordion-title",
  slot,
  ...restProps
}) {
  return View({ componentName, slot, ...restProps });
}

export function Accordions({
  componentName = "accordions",
  persistent,
  slot,
  ...restProps
}) {
  id = 0;
  return View({
    ...restProps,
    componentName,
    slot,
    ctx: { persistent },
    onMount(el) {
      let active = null;
      function getContext() {
        return JSON.parse(el.getAttribute("ctx"));
      }

      function toggle(id) {
        el.querySelector(
          `[y-accordion-header-button="${id}"]`
        ).classList.toggle("y-accordion-header-button-collapsed");

        el.querySelector(`[y-accordion-body="${id}"]`).classList.toggle(
          "y-accordion-body-show-opened"
        );
        el.querySelector(`[y-accordion-body="${id}"]`).classList.toggle(
          "y-accordion-body-show-closed"
        );

        if (active !== id) {
          active = id;
        } else {
          active = null;
        }
      }

      el.querySelectorAll("[y-accordion-header-button]").forEach((button) => {
        button.addEventListener("click", () => {
          const id = button.getAttribute("y-accordion-header-button");
          if (active && active !== id && getContext().persistent === false) {
            toggle(active);
          }

          toggle(id);
        });
      });
    },
  });
}
