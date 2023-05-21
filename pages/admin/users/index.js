import { Button, Dropdown, DropdownItem, DropdownMenu, Text, View } from "../../../components/index.js";
import { Page } from "../../../components/Page.js";

export default ({ url }) => {
  return Page({
    title: "Users list Page",
    body: View({
      slot: [
        Text({slot: 'Checking Dropdown....'}),
        Dropdown({
          target: Button({
            slot: 'Click me',
            color: 'primary'
          }),
          slot: DropdownMenu({
            slot: [
              DropdownItem({slot: 'Text 1'}),
              DropdownItem({slot: 'Text 2'}),
              DropdownItem({slot: 'Text 3'}),
            ]
          })
        }),
      ]
    }),
  });
};
