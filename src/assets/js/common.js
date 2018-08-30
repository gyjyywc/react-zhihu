import { prefixStyle, debounce } from 'assets/js/utils'

const TRANSFORM = prefixStyle('transform')

function sidebarClickIn(animationDelay = 200) {
  let sidebarWrapper = document.getElementById('sidebarWrapper')
  sidebarWrapper.style.display = 'block'
  // 保证动画效果
  debounce(() => {
    sidebarWrapper.style.background = 'rgba(0,0,0,0.3)'
    // sidebar主体
    let sidebar = sidebarWrapper.children[0]
    sidebar.style[TRANSFORM] = 'translate3d(0,0,0)'
  }, animationDelay)()
}

function sidebarClickOut(animationDelay = 200) {
  let sidebarWrapper = document.getElementById('sidebarWrapper')
  sidebarWrapper.style.background = 'transparent'
  // sidebar主体
  let sidebar = sidebarWrapper.children[0]
  sidebar.style[TRANSFORM] = 'translate3d(-100%,0,0)'
  // 保证动画效果，延迟时间与动画时一致
  debounce(() => {
    sidebarWrapper.style.display = 'none'
  }, animationDelay)()
}


export { sidebarClickIn, sidebarClickOut }