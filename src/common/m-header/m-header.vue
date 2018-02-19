<template>
  <header class="header">
    <span class="left-content">
      <i class="icon-nav"></i>
      <em>{{title}}</em>
    </span>
    <span class="right-content">
      <i class="icon-notice"></i>
      <i class="icon-setting"></i>
    </span>
  </header>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'm-header',
    props: {
      title: {
        type: String,
        default: () => {
          return '首页'
        }
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "~assets/stylus/variable"

  .header
    position: relative
    width: 100%
    height: 50px
    background: $color-theme
    color: $color-text-ll
    .left-content
      position: absolute
      top: 0
      left: 18px
      height: 50px;
      line-height: 50px
      font-size: 20px
      i
        font-size: 28px
        vertical-align: text-bottom
      em
        margin-left: 20px
    .right-content
      position: absolute
      top: 0
      right: 18px
      height: 50px;
      line-height: 50px
      i
        position: relative
        top: 3px
        font-size: 26px
      em
        margin-right: 20px
</style>
