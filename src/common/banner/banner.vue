<template>
  <div class="banner" :style="{width: getWidth + '00%'}">
    <div class="pic-wrapper" v-for="(item,index) in topList" :key="index">
      <div class="pic" :style="_getBackground(item.image)">
        <em>{{item.title}}</em>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {getImage} from 'assets/js/common'

  export default {
    name: 'banner',
    props: {
      topList: {
        type: Array,
        default: () => {
          return []
        }
      }
    },
    data() {
      return {
        getWidth: ''
      }
    },
    mounted() {
      setTimeout(() => {
        this._getPicLength()
      }, 300)
    },
    methods: {
      _getBackground(url) {
        let css = getImage(url)
        return `background-image: url('${css}')`
      },
      _getPicLength() {
        this.getWidth = this.topList.length
        console.log(this.getWidth)
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import '~assets/stylus/mixin'

  .banner
    height: 230px
    overflow: hidden
    .pic-wrapper
      float: left
      width: 375px
      clear-float()
      .pic
        width: 100%
        height: 230px
        overflow: hidden
        background-size: cover
        background-repeat: no-repeat
        background-position: center
        img
          display: inline-block
          width: 100%
          height: 230px
</style>
