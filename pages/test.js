import { BaseLayout } from "../components/BaseLayout.js";
import { tag } from "../lib/ui.js";

export const css = `
h1.open { display: block; }
h1 { display: none; }
`;

export const js = `
function test(value) {
    console.log('test functon called ' + value)
    alert('Hello World!')
}
`;

export default () => {
  return BaseLayout({
    slot: tag("div", {
      slot: [
        tag("div", {
          slot: "Test",
          "uon-click": "toggle(#target,y-el-d-none)",
          "uon-init": "set(#target,open,false)",
        }),
        tag("h1", {
          slot: "Content",
          id: "target",
          "uon-click": "toggle ( #target , y-el-d-none )",
        }),
        tag("h2", {
          slot: "Content 2",
          id: "target2",
          "uon-click": "toggle(#target,y-el-d-none)",
          "uon-init": "set(#target2,y-el-d-none,false)",
        }),
      ],
    }),
  });
};
