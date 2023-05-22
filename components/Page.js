
import { Text } from "./Text.js";
import { View } from "./View.js";

export function PageHeader ({title, actions}){

return View({
  justifyContent: "between",
  alignItems: "center",
  d: 'flex',
  mb: "3",
  slot: [
    title && View({ tag: "h2", m: 0, slot: title }),
    actions,
  ],
});
} 

export function Page({title, actions, body, layout}) {
  
  layout = layout ?? View;

  return layout({
      slot: View({
      gap: 3,
      p: 3,
      column: true,
      style: "width: 100%",
      slot: [PageHeader({title, actions}), body],
    }),
  })
}
