import React, {Component} from 'react';
import BScroll from 'better-scroll';
import {windowWith, addClass} from 'assets/js/dom';
import {getImage} from 'assets/js/common';
import './banner.styl';

const PERCENT = 0.613;

class Banner extends Component {

  _getBackground(url) {
    let css = getImage(url);
    return `background-image: url('${css}')`;
  }

  _setSliderWidthAndHeight() {
    this.children = this.$refs.sliderGroup.children;
    let width = 0;
    let height = Math.round(windowWith * PERCENT);
    let sliderWidth = this.$refs.slider.clientWidth;
    for (let i = 0; i < this.children.length; i++) {
      let child = this.children[i];
      addClass(child, 'slider-item');
      child.style.width = sliderWidth + 'px';
      child.style.height = height + 'px';
      width += sliderWidth;
    }
    if (this.loop) {
      width += sliderWidth * 2;
    }
    this.$refs.sliderGroup.style.width = width + 'px';
    this.$refs.sliderGroup.style.height = height + 'px';
  }

  _initScroll() {
    this.scroll = new BScroll(this.$refs.slider, {
      scrollX: true,
      scrollY: false,
      momentum: false,
      snap: true,
      snapLoop: this.loop,
      snapThreshold: 0.3,
      snapSpeed: 400
    });
    this.scroll.on('scrollEnd', () => {
      let index = this.scroll.getCurrentPage().pageX;
      if (this.loop) {
        index -= 1
      }
      this.currentIndex = index;
      if (this.autoPlay) {
        this._play();
      }
    });
    this.scroll.on('touchend ', () => {
      if (this.autoPlay) {
        this._play();
      }
    });
    this.scroll.on('beforeScrollStart', () => {
      if (this.autoPlay) {
        clearTimeout(this.sliderTimer)
      }
    });
  }

  _initDots() {
    this.dots = new Array(this.children.length);
  }

  _play() {
    let index = this.currentIndex + 1;
    if (this.loop) {
      index += 1;
      clearTimeout(this.sliderTimer);
      this.sliderTimer = setTimeout(() => {
        this.scroll.goToPage(index, 0, 400)
      }, this.interval);
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this._setSliderWidthAndHeight();
      this._initDots();
      this._initScroll();
      if (this.loop) {
        this._play();
      }
    }, 300)
  }

  render() {
    return (
      <div className="slider" ref="slider">
        <div className="slider-group" ref="sliderGroup">
          <div>
            <div className="pic">
              <em></em>
            </div>
          </div>
        </div>
        <div className="dots">
          <span className="dot"></span>
        </div>
      </div>
    );
  }
}

export default Banner;