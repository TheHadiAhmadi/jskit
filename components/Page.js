import { Html } from "./Html.js";
import { Script } from "./Script.js";
import { Style } from "./Style.js";
import { Text } from "./Text.js";
import { View } from "./View.js";

export function Page(props) {
  const title = View({
    justify: "between",
    align: "center",
    mb: "3",
    slot: [
      props.title && Text({ tag: "h2", style: "margin: 0", text: props.title }),
      props.actions && props.actions,
    ],
  });

  let layout = props.layout ?? View;

  return Html({
    head: [
      Style({src: '/tabler.min.css'}),
    ],
    body: layout({
      slot: View({
      gap: 3,
      p: 3,
      column: true,
      style: "width: 100%",
      slot: [title, props.body],
    }),
  }),
  })
}
