import { tag } from "../lib/ui.js"


const Form = function({action, ...props}) {
    return tag('form', {
        action: action,
        method: 'POST',
        ...props
    })
}

Form.Input = function ({ placeholder, col, value, label, required, ...props}) {
    let className = 'y-form-input'

    if(col) {
        className += ' y-el-col-' + col
    }

    return tag('div', {
        class: className,
        slot: [
            label && tag('label', { class: 'y-label' + (required ? ' y-label-required' : ''), slot: label }),
            tag('input', {
                class: 'y-input',
                value,
                required,
                placeholder,
            })
        ]
    })
}

export {Form}