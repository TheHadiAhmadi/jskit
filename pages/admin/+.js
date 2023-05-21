import { Text } from "../../components/index.js";
import { Page } from "../../components/Page.js";

export default ({ url }) => {
  return Page({
    title: "...Rest Page",
    body: Text({ text: "url is: " + url.href }),
  });
};
