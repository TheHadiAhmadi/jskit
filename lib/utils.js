// import { paramCase } from 'param-case'
function paramCase(text) {
    let result = ''
    for(let i of text) {
        if(i > 'A' && i < 'Z') {
            result += '-' + i.toLowerCase()
        } else {
            result += i
        }
    }
    return result
}

const prefix = 'y'

export const classname = (componentName, cssObject, staticClassName) => {
	if (!componentName) return undefined
	componentName = paramCase(componentName)
	const pre = `${prefix}-${componentName}`
	const result = [pre]
	if (cssObject) {
		const entries = Object.entries(cssObject)

		for (const [key, value] of entries) {
			const propName = paramCase(key)
			if (typeof value == 'undefined' || value === false) continue
			if (value === true) result.push(`${pre}-${propName}`)
			else if (typeof value == 'number' || typeof value == 'string')
				result.push(`${pre}-${propName}-${value}`)
			else continue
		}
	}
	if (staticClassName) result.push(staticClassName)

	return result.join(' ') || undefined
}
