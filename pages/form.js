import { Form } from "../components/Form.js";
import { Style } from "../components/Style.js";
import { Html } from "../components/Html.js";

export default function() {
    return Html({
        head: Style({src: '/tabler.min.css'}),
        body: Form({
            slot: [
                Form.Input({label: 'Input', col: 6, placeholder: 'Enter something...'})
            ]
        })
    })
} 