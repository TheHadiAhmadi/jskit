import { tag } from "../lib/ui.js";
import { View } from "./View.js";

let id = 0
export function Tabs(props) {
    return View({
        class: 'y-tabs',
        ...props,
        'u-tabs': function (el) {
            el.querySelectorAll('[u-tab-item]').forEach(tabItem => {

                tabItem.addEventListener('click', (e) => {
                    const id = tabItem.getAttribute('u-tab-item')

                    el.querySelector(`[u-tab-item].y-tab-item-link-active`)?.classList.remove('y-tab-item-link-active')
                    el.querySelector(`[u-tab-item="${id}"]`)?.classList.add('y-tab-item-link-active')

                    el.querySelectorAll(`[u-tab-pane]:not(.u-el-d-none)`).forEach(el => el.classList.add('y-el-d-none'))
                    el.querySelector(`[u-tab-pane="${id}"]`)?.classList.remove('y-el-d-none')
                })

            })
        }
    })
}

export function TabItem({slot, active, ...props}) {
    return tag('li', {
        class: 'y-tab-item',
        slot: tag('button', {
            'u-tab-item': id++,
            class: 'y-tab-item-link' + (active ? ' y-tab-item-link-active': ''),
            slot
        }), ...props
    })
}

export function TabList(props) {
    id = 0
    return tag('ul', {
        class: 'y-tab-list',
        ...props
    })
}

export function TabContent(props) {
    id = 0
    return View({
        class: 'y-tab-content',
        ...props
    })
}

export function TabPanel({active, ...props}) {
    return View({
        'u-tab-pane': id++,
        class: 'y-tab-pane' + (active ? '' : 'y-el-d-none'),
        ...props
    })
}