import { AdminLayout } from "../../components/AdminLayout.js";
import { Text } from "../../components/index.js";
import { Page } from "../../components/Page.js";

export default ({ url }) => {
  return Page({
    layout: AdminLayout,
    title: "Settings Page",
    body: Text({ text: "Not Available yet!" }),
  });
};
