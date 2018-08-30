let eleStyle = document.createElement('div').style
let vendor = (() => {
  let transformNames = {
    webkit: 'webkitTransform',
    Moz: 'MozTransform',
    O: 'OTransform',
    ms: 'msTransform',
    standard: 'transform'
  }

  for (let key in transformNames) {
    if (eleStyle[transformNames[key]] !== undefined) {
      return key
    }
  }
  return false
})()

// export 部分
function prefixStyle(style) {
  if (vendor === false) {
    return
  }
  if (vendor === 'standard') {
    return style
  }
  return vendor + style.charAt(0).toUpperCase() + style.substr(1)
}

function addClass(el, clsName) {
  if (!hasClass(el, clsName)) {
    let newCls = el.className.split(' ')
    newCls.push(clsName)
    el.className = newCls.join(' ')
  }
}

function hasClass(el, clsName) {
  let reg = new RegExp('(^|\\s)' + clsName + '(\\s|$)')
  return reg.test(el.className)
}

function throttle(fn, threshhold) {
  let lastTime, throttleTimer
  threshhold || (threshhold = 250)
  return function (...args) {
    let nowTime = +new Date()
    if (lastTime && nowTime < lastTime + threshhold) {
      clearTimeout(throttleTimer)
      // 保证在当前时间区间结束后，再执行一次 fn
      throttleTimer = setTimeout(() => {
        lastTime = nowTime
        fn.apply(this, args)
      }, threshhold)
      // 在时间区间的最开始和到达指定间隔的时候执行一次 fn
    } else {
      lastTime = nowTime
      fn.apply(this, args)
    }
  }
}

function debounce(fn, delay) {
  let debounceTimer

  return function (...args) {
    if (debounceTimer) {
      clearTimeout(debounceTimer)
    }
    debounceTimer = setTimeout(() => {
      fn.apply(this, args)
    }, delay)
  }
}

export { prefixStyle, addClass, hasClass, throttle, debounce }