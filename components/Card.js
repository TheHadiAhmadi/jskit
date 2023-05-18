import { Text } from "./Text.js";
import { View } from "./View.js";

export function Card({ title, ...props }) {
  if (title) {
    props.slot = [CardHeader({ slot: CardTitle({ slot: title }) }), props.slot];
  }
  return View({ class: "y-card", ...props });
}

export function CardHeader(props) {
  return View({ class: "y-card-header", ...props });
}

export function CardTitle(props) {
  return Text({ class: "y-card-title", tag: "h3", ...props });
}
export function CardBody({ ...props }) {
  return View({ class: "y-card-body", ...props });
}
export function CardFooter({ ...props }) {
  return View({ class: "y-card-footer", ...props });
}
export function CardActions({ ...props }) {
  return View({ class: "y-card-actions", ...props });
}
