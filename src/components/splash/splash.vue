<template>
  <div class="splash-wrapper">
    <img class="splash" ref="splashImg" src="~assets/imgs/splash.jpg" alt="你,的名字.">
  </div>
</template>

<script type="text/ecmascript-6">
  import {prefixStyle} from 'assets/js/dom'

  const transform = prefixStyle('transform')

  export default {
    name: 'splash',
    mounted() {
      setTimeout(() => {
        this.$refs.splashImg.style[transform] = 'scale(1.1)'
      }, 1)
      setTimeout(() => {
        this.$router.push({
          path: '/index'
        })
      }, 1700)
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .splash-wrapper
    width: 100%
    height: 100vh
    overflow: hidden
    .splash
      width: 100%
      height: 100vh
      transition: all 1.5s ease
      transform: scale(1)
</style>
