import { Text, View } from "../../components/index.js";

export default (props) => {
  return View({
    slot: [Text({ text: "Admin test" }), Text({ text: props.url.pathname })],
  });
};
