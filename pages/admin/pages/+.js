import { Text, View } from "../../../components/index.js"

export default ({url}) => {
    return View({
        slot: Text({
            text: 'Catch all route, ' + url
        })
    })
}