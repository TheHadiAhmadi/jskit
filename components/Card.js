import { View } from "./View.js";

// all Card components are 100% same as yesvelte

export function Card({
  componentName = 'card',
  title,
  stacked,
  statusColor,
  statusPosition,
  statusSize,
  status,
  bgColor,
  borderless,
  rotate,
  state,
  size, 
  slot,
  ...restProps 
}) {

  let cssProps = {
    stacked,
    bgColor,
    borderless,
    rotate,
    state,
    size,
  }
  let props = {
    componentName,
  }

  let statusCssProps = {
    size: statusSize,
    position: statusPosition,
    color: statusColor,
  }
  
  if (title) {
    props.slot = [, props.slot];
  }
  return View({ ...restProps, cssProps, ...props, slot: [
    status && View({componentName: componentName + '-status', cssProps: statusCssProps}),
    title && CardHeader({ slot: CardTitle({ slot: title }) }),
    ...slot
  ] });
}

export function CardHeader({light, componentName = 'card-header', slot, ...restProps}) {
  return View({ componentName, cssProps: {light}, slot, ...restProps });
}

export function CardFooter({transparent, componentName = 'card-footer', slot, ...restProps}) {
  return View({ componentName, cssProps: {transparent}, slot, ...restProps });
}

export function CardTitle({ componentName = 'card-title', slot, ...restProps }) {
  return View({ componentName, slot, ...restProps });
}

export function CardBody({ componentName = 'card-body', slot, ...restProps }) {
  return View({ componentName, slot, ...restProps });
}

export function CardActions({ componentName = 'card-actions', slot, ...restProps }) {
  return View({ componentName, slot, ...restProps });
}

export function CardMedia({ componentName = 'card-media', elementPosition = 'top', slot, ...restProps }) {
  return View({ componentName, slot, cssProps: {elementPosition}, ...restProps });
}
