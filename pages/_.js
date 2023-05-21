import { Html, Style } from "../components/index.js"

export default ({slot}) => {
    return Html({
        head: [Style({src: '/tabler.min.css'})],
        body: slot
    })
}