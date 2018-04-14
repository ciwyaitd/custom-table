/*
 * utils
 * @Author: hejinming
 * @Date: 2018-04-13 11:33:47
 * @Last Modified by: hejinming
 * @Last Modified time: 2018-04-13 12:15:52
 */

export function hasClass(el, cls) {
    if (!el || !cls) return false
    if (cls.indexOf(' ') !== -1) throw new Error('className should not contain space.')
    if (el.classList) {
        return el.classList.contains(cls)
    } else {
        return (` ${el.className} `).indexOf(` ${cls} `) > -1
    }
}

export function addClass(el, cls) {
    if (!el) return
    let curClass = el.className
    let classes = (cls || '').split(' ')
    classes.map(v => {
        if (!v) return
        if (el.classList) {
            el.classList.add(v)
        } else {
            if (!hasClass(el, v)) {
                curClass += ` ${v}`
            }
        }
    })

    if (!el.classList) {
        el.className = curClass
    }
}

export function removeClass(el, cls) {
    if (!el || !cls) return
    let classes = cls.split(' ')
    let curClass = ` ${el.className} `

    classes.map(v => {
        if (!v) return
        if (el.classList) {
            el.classList.remove(v)
        } else {
            if (hasClass(el, v)) {
                curClass = curClass.replace(` ${v} `, ' ')
            }
        }
    })

    if (!el.classList) {
        el.className = String(curClass).trim()
    }
}
