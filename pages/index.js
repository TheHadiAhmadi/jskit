import { Button, Text, View } from "../components/index.js";
import { Page } from "../components/Page.js";

export async function load({ url }) {
  return {
    text: url.pathname + " (run on server)",
  };
}

export default (props) => {
  return Page({
    body: View({
      gap: 4,
      align: "center",
      justify: "center",
      column: true,
      slot: [
        Button({ slot: "Hello World!" }),
        Text({ slot: "Welcome to UBuilder" }),
        View({
          p: 5,
          slot: Button({ color: "primary", slot: "Login", href: "/admin" }),
        }),
      ],
    }),
  });
};
