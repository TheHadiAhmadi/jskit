import {
  Button,
  ButtonList,
  Text,
  View,
} from "../../../../components/index.js";
import { AdminLayout } from "../../../../components/AdminLayout.js";
import { Page } from "../../../../components/Page.js";

export function PageEditor({ params, editing }) {
  return Page({
    layout: AdminLayout,
    title: (editing ? "Edit" : "View") + ": Page #" + params.id,
    actions: editing
      ? [
          ButtonList({
            slot: [
              Button({ slot: "Cancel", href: `/admin/pages/${params.id}` }),
              Button({
                slot: "Save",
                color: "primary",
                href: `/admin/pages/${params.id}`,
              }),
            ],
          }),
        ]
      : [
          Button({
            slot: "Edit",
            color: "primary",
            href: `/admin/pages/${params.id}/edit`,
          }),
        ],
    body: View({
      p: 3,
      style: "border: 1px solid black",
      slot: editing
        ? Text({ text: "Show Form to edit page.", tag: "h2" })
        : Text({ text: "Preview of page as HTML", tag: "h2" }),
    }),
  });
}

export default ({ params }) => PageEditor({ params, editing: false });
