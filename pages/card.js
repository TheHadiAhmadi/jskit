import { Html } from "../components/Html.js";
import { Style } from "../components/Style.js";
import {
  Button,
  ButtonList,
  Card,
  CardActions,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  View,
} from "../components/index.js";

export const actions = {
  POST(req) {
    return {
      hello: "world!",
    };
  },
  GET(req) {
    // return true;
  },
};

export default () => {
  return Html({
    head: [Style({src: '/tabler.min.css'})],
    body: Card({
      slot: [
        CardHeader({
          slot: [
            CardTitle({ slot: "Hello World From Card Title" }),
            CardActions({
              slot: Button({ slot: "Small", color: "success", size: "sm" }),
            }),
          ],
        }),
        CardBody({ slot: ["Count: ", 0] }),
        CardFooter({
          slot: CardActions({
            slot: ButtonList({
              slot: [
                Dropdown({
                  target: Button({ slot: "Dropdown" }),
                  slot: DropdownMenu({
                    slot: [
                      DropdownItem({
                        slot: "Item 1",
                        onClick: "console.log(1)",
                      }),
                      DropdownItem({
                        slot: "Item 2",
                        onClick: "console.log(2)",
                      }),
                      DropdownItem({ divider: true }),
                      DropdownItem({
                        slot: "Item 3",
                        onClick: "console.log(3)",
                      }),
                    ],
                  }),
                }),
                Dropdown({
                  target: Button({ slot: "Dropdown" }),
                  slot: DropdownMenu({
                    slot: [
                      DropdownItem({
                        slot: "Item 1",
                        onClick: "console.log(1)",
                      }),
                      DropdownItem({
                        slot: "Item 2",
                        onClick: "console.log(2)",
                      }),
                      DropdownItem({ divider: true }),
                      DropdownItem({
                        slot: "Item 3",
                        onClick: "console.log(3)",
                      }),
                    ],
                  }),
                }),
                Dropdown({
                  target: Button({ slot: "Dropdown" }),
                  slot: DropdownMenu({
                    slot: [
                      DropdownItem({
                        slot: "Item 1",
                        onClick: "console.log(1)",
                      }),
                      DropdownItem({
                        slot: "Item 2",
                        onClick: "console.log(2)",
                      }),
                      DropdownItem({ divider: true }),
                      DropdownItem({
                        slot: "Item 3",
                        onClick: "console.log(3)",
                      }),
                    ],
                  }),
                }),
                Dropdown({
                  target: Button({ slot: "Dropdown" }),
                  slot: DropdownMenu({
                    slot: [
                      DropdownItem({
                        slot: "Item 1",
                        onClick: "console.log(1)",
                      }),
                      DropdownItem({
                        slot: "Item 2",
                        onClick: "console.log(2)",
                      }),
                      DropdownItem({ divider: true }),
                      DropdownItem({
                        slot: "Item 3",
                        onClick: "console.log(3)",
                      }),
                    ],
                  }),
                }),
                Button({
                  slot: "Back",
                  //   "@click"() {
                  //     count = count - 1;
                  //     console.log("back");
                  //   },
                }),
                Button({ slot: "Next", color: "primary" }),
              ],
            }),
          }),
        }),
      ],
    })
  })
};
