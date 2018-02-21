<template>
  <div class="slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
      <div v-for="(item,index) in topList" :key="index">
        <div class="pic" :style="_getBackground(item.image)">
          <em>{{item.title}}</em>
        </div>
      </div>
    </div>
    <div class="dots">
      <span class="dot" v-for="(dot,index) in dots" :class="{'active':currentIndex === index}" :key="index"></span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'
  import {windowWith, addClass} from 'assets/js/dom'
  import {getImage} from 'assets/js/common'

  const PERCENT = 0.613

  export default {
    props: {
      topList: {
        type: Array,
        default: () => {
          return []
        }
      },
      loop: {
        type: Boolean,
        default: true
      },
      autoPlay: {
        type: Boolean,
        default: true
      },
      interval: {
        type: Number,
        default: 4000
      }
    },
    data() {
      return {
        dots: [],
        currentIndex: 0
      }
    },
    mounted() {
      setTimeout(() => {
        this._setSliderWidthAndHeight()
        this._initDots()
        this._initScroll()
        if (this.loop) {
          this._play()
        }
      }, 300)
    },
    methods: {
      _getBackground(url) {
        let css = getImage(url)
        return `background-image: url('${css}')`
      },
      _setSliderWidthAndHeight() {
        this.children = this.$refs.sliderGroup.children
        let width = 0
        let height = Math.round(windowWith * PERCENT)
        let sliderWidth = this.$refs.slider.clientWidth
        for (let i = 0; i < this.children.length; i++) {
          let child = this.children[i]
          addClass(child, 'slider-item')
          child.style.width = sliderWidth + 'px'
          child.style.height = height + 'px'
          width += sliderWidth
        }
        if (this.loop) {
          width += sliderWidth * 2
        }
        this.$refs.sliderGroup.style.width = width + 'px'
        this.$refs.sliderGroup.style.height = height + 'px'
      },
      _initScroll() {
        this.scroll = new BScroll(this.$refs.slider, {
          scrollX: true,
          scrollY: false,
          momentum: false,
          snap: true,
          snapLoop: this.loop,
          snapThreshold: 0.3,
          snapSpeed: 400
        })
        this.scroll.on('scrollEnd', () => {
          let index = this.scroll.getCurrentPage().pageX
          if (this.loop) {
            index -= 1
          }
          this.currentIndex = index
          if (this.autoPlay) {
            this._play()
          }
        })
        this.scroll.on('touchend ', () => {
          if (this.autoPlay) {
            this._play()
          }
        })
        this.scroll.on('beforeScrollStart', () => {
          if (this.autoPlay) {
            clearTimeout(this.sliderTimer)
          }
        })
      },
      _initDots() {
        this.dots = new Array(this.children.length)
      },
      _play() {
        let index = this.currentIndex + 1
        if (this.loop) {
          index += 1
          clearTimeout(this.sliderTimer)
          this.sliderTimer = setTimeout(() => {
            this.scroll.goToPage(index, 0, 400)
          }, this.interval)
        }
      }
    },
    // 避免切换回来轮播图不滚动
    activated() {
      if (this.autoPlay) {
        this._play()
      }
    },
    deactivated() {
      clearTimeout(this.sliderTimer)
    },
    beforeDestroy() {
      clearTimeout(this.sliderTimer)
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~assets/stylus/variable"

  .slider
    position: relative
    min-height: 1px
    .slider-group
      overflow: hidden
      white-space: nowrap
      .slider-item
        float: left
        overflow: hidden
        box-sizing: border-box
        a
          display: block
          width: 100%
          overflow: hidden
          text-decoration: none
        img
          display: block
          width: 100%
        .pic
          width: 100%
          height: 100%
          overflow: hidden
          background-size: cover
          background-repeat: no-repeat
          background-position: center
          box-sizing: border-box
          em
            color: $color-text-ll
    .dots
      position: absolute
      right: 0
      bottom: 12px
      left: 0
      text-align: center
      font-size: 0
      .dot
        display: inline-block
        margin: 0 4px
        width: 8px
        height: 8px
        border-radius: 50%
        background: $color-dot-d
        &.active
          width: 15px
          border-radius: 5px
          background: $color-dot-l
</style>
