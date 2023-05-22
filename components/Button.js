import { tag } from "../lib/ui.js";
import { View } from "./View.js";

// icon prop doesn't work.

export function Button({ active,
  color,
  componentName = 'button',
  disabled,
  ghost,
  href,
  link,
  loading,
  outline,
  shape,
  size,
  target,
  type,
  ...restProps }) {

  let cssProps = {
    active,
    color,
    disabled,
    ghost,
    icon: false,
    link,
    loading,
    outline,
    shape,
    size,
  }

  let props = {
    componentName,
    href,
    role: 'button',
    tag: href ? 'a' : 'button',
    target,
    type: type ?? 'button',
  }

  return View({
    ...props,
    cssProps,
    ...restProps
  });
}

export function ButtonList({ ...props }) {
  return View({ d: 'flex', gap: 2, ...props });
}
