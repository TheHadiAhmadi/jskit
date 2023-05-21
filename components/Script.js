import { tag } from "../lib/ui.js"

export function Script({code, src, ...props}) {
    if(src) {
        return tag('script', {
            src,
            defer: true,
            ...props
        })
    } 

    if(code) {
        return tag('script', {
            ...props,
            slot: code,
        })
    }
}