import { View } from "./View.js";

export function Dropdown({ ...props }) {
  if (props.target) {
    props.slot = [
      {
        ...props.target,
        props: { ...props.target.props, 'u-toggle': "dropdown" },
      },
      props.slot,
    ];
  }
  return View({
    class: "y-dropdown",
    slot: props.slot,
    "u-dropdown": function (el) {
      el.querySelector('[u-toggle="dropdown"]').addEventListener('click', (e) => {
        el.querySelector('[u-dropdown-menu]').classList.toggle('y-el-d-none')
      })
    }
  });
}

export function DropdownMenu({ open, ...props }) {
  return View({
    "u-dropdown-menu": true,
    class: "y-dropdown-menu " +( open ? '' : 'y-el-d-none'),
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
  return View({ class: className, "u-click": onClick, ...props });
}
