import { View } from "./View.js";

let id = 0;

export function Dropdown({ ...props }) {
  if (props.target) {
    props.slot = [
      {
        
        ...props.target,
        props: { ...props.target.props,id: "dropdown-" + id++, "@click": "open = !open" },
      },
      props.slot,
    ];
  }
  return View({
    class: "y-dropdown",
    slot: props.slot,
    "x-data": "{ open: false }",
  });
}

export function DropdownMenu({ ...props }) {
  return View({
    "x-show": "open",
    class: "y-dropdown-menu",
    "@click.outside": "open=false",
    "@click": "open=false",
    ...props,
  });
}

export function DropdownItem({ divider, header, onClick, ...props }) {
  if (divider) {
    return View({ class: "y-dropdown-item-divider", ...props });
  }
  if (header) {
    return View({ class: "y-dropdown-item-header", ...props });
  }
  let className = "y-dropdown-item";
  if (props.active) {
    className += " y-dropdown-item-active";
  }
  return View({ class: className, "@click": onClick, ...props });
}
