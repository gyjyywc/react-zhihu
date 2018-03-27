let eleStyle = document.createElement('div').style;
let vendor = (() => {
  let transformNames = {
    webkit: 'webkitTransform',
    Moz: 'MozTransform',
    O: 'OTransform',
    ms: 'msTransform',
    standard: 'transform'
  };

  for (let key in transformNames) {
    if (eleStyle[transformNames[key]] !== undefined) {
      return key;
    }
  }
  return false;
})();

// export 部分
export function prefixStyle(style) {
  if (vendor === false) {
    return;
  }
  if (vendor === 'standard') {
    return style;
  }
  return vendor + style.charAt(0).toUpperCase() + style.substr(1);
}

export function addClass(el, clsName) {
  if (!hasClass(el, clsName)) {
    let newCls = el.className.split(' ');
    newCls.push(clsName);
    el.className = newCls.join(' ');
  }
}

export function hasClass(el, clsName) {
  let reg = new RegExp('(^|\\s)' + clsName + '(\\s|$)');
  return reg.test(el.className);
}
