import { Text, View } from "../components/index.js";

function SetsContext(props) {
  console.log("sets context", props);
  SetContext("id", props.id);
  return View({
    ...props,
  });
}

function GetsContext(props) {
  console.log("gets context", props);
  let id = getContext("id");

  return Text({
    text: id,
    ...props,
  });
}

export default function () {
  return SetsContext({
    id: "My Id",
    slot: [GetsContext({}), GetsContext({}), GetsContext({})],
  });
}
