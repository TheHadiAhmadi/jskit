import { Text } from "../../components/index.js";
import { Page } from "../../components/Page.js";

export default ({ params }) => {
  return Page({
    title: "Dynamic Page",
    body: Text({ text: "id is: <b>" + params.id + "</b>" }),
  });
};
