import { tag } from "../lib/ui.js";

export function Html({
  body = "",
  head = '',
  title = ''
}) {
  
  return tag('html', {

    title,
    body,
    head
  })
}
