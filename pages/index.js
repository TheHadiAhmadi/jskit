import { Button, Text, View } from "../components/index.js";

export async function load({ url }) {
  return {
    text: url.pathname + " (run on server)",
  };
}

export default (props) => {
  return View({
    class: "y-el y-el-d-flex y-el-align-items-center y-el-gap-4",
    slot: [
      Button({ slot: "Hello World!" }),
      Text({ slot: props.url.pathname }),
      Text({ slot: props.text }),
    ],
  });
};
