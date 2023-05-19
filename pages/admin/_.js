import { Text, View } from "../../components/index.js";

export function middleware(req, res, next) {
  console.log("middleware");
}

export default (props) => {
  return View({
    slot: [
      Text({
        text: "Layout file, Header....",
      }),
      props.slot,
    ],
  });
};
