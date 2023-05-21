import { Text, View } from "../components/index.js";
import { Html } from "../components/Html.js";
import { Script } from "../components/Script.js";
import { Style } from "../components/Style.js";

export default () => Html({
    head: [
        Style({code: 'h1 {color: red}'}),
        Script({code: 'console.log("init from head")'})
    ],
    body: View({
        slot: Text({slot: "Hello World!", tag: 'h1'})
    })
})