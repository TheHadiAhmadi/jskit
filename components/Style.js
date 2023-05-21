import { tag } from "../lib/ui.js"

export function Style({src, code}) {

    if(src) {
        return tag('link', {
            rel: 'stylesheet',
            href: src
        })
    } else {
        return tag('style', {
            slot: code
        })
    }
}