// 用于封装添加Class
export function addClass(el, className) {
    if (hasClass(el, className)) return;
    let newClass = el.className.split(' ');
    newClass.push(className);
    el.className = newClass.join(' ');
}

// 用于判断该dom是否有class
export function hasClass(el, className) {
    let reg = new RegExp('(^|\\s)' + className + '(\\s|$)');
    return reg.test(el.className);
}

// 封装用于获取标签上有data-属性的值
export function getData(el, name, val) {
    const prefix = "data-";
    name = prefix + name;
    if (val) {
        return el.setAttribute(name, val);
    } else {
        return el.getAttribute(name);
    }
}

let elementStyle = document.createElement('div').style;
let vendor = (() => {
    let transformNames = {
        webkit: 'webkitTransform',
        Moz: 'MozTransform',
        O: 'OTransform',
        ms: 'msTransform',
        standard: 'transform'
    }
    for (let key in transformNames) {
        if (elementStyle[transformNames[key]] !== undefined) {
            return key;
        }
    }
    return false;
})()

export function prefixStyle(style) {
    if (vendor === false) {
        return false;
    }
    if (vendor === 'standard') {
        return style;
    }
    return vendor + style.charAt(0).toUpperCase() + style.substr(1);
}