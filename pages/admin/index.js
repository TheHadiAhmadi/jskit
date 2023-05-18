import { Text, View } from "../../components/index.js";

export default (props) => {
  return View({
    class: "y-el y-el-d-flex y-el-gap-2",
    slot: [Text({ text: "Admin index" }), Text({ text: props.url.pathname })],
  });
};
