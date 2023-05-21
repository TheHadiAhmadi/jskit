import { Text, View } from "../../../components/index.js"

export default (props) => {
    console.log(props)
    return View({
        slot: [
            View({
                style: 'width: 200px',
                class: 'y-el-border-end',
                column: true,
                slot: [
                    View({p: 2, slot: Text({text: 'page #1'})}),
                    View({p: 2, slot: Text({text: 'page #2'})}),
                    View({p: 2, slot: Text({text: 'page #3'})})
                ]
            }),
            View({
                ...props                
            })

        ]
    })
}