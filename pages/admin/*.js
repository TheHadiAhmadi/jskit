import { AdminLayout } from "../../components/AdminLayout.js";
import { Text } from "../../components/index.js";
import { Page } from "../../components/Page.js";

export default ({ url }) => {
  return Page({
    layout: AdminLayout,
    title: "...Rest Page",
    body: Text({ text: "url is: " + url.href }),
  });
};
