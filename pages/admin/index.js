import { AdminLayout } from "../../components/AdminLayout.js";
import { Text, View } from "../../components/index.js";
import { Page } from "../../components/Page.js";

export default ({ url }) => {
  return Page({
    // layout: AdminLayout,
    title: "Main Page",
    body: Text({ text: "Not Available yet!" }),
  });
};

