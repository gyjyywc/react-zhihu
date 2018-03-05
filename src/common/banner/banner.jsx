import React, {Component} from 'react';
import BScroll from 'better-scroll';
import {windowWith, addClass} from 'assets/js/dom';
import {getImage} from 'assets/js/common';
import PropTypes from 'prop-types';
import './banner.styl';

const PERCENT = 0.613;

class Banner extends Component {

  dots = [];
  currentIndex = 0;

  // 定义默认值
  static defaultProps = {
    topList: [],
    loop: true,
    autoPlay: false,
    interval: 4000
  };

  // 定义类型
  static propTypes = {
    topList: PropTypes.array.isRequired,
    loop: PropTypes.bool,
    autoPlay: PropTypes.bool,
    interval: PropTypes.number,
  };

  _getBackground(url) {
    let css = getImage(url);
    return {
      backgroundImage: `url("${css}")`
    };
  }

  _setSliderWidthAndHeight() {
    this.children = document.getElementById('sliderGroup').children;
    let width = 0;
    let height = Math.round(windowWith * PERCENT);
    let sliderWidth = document.getElementById('slider').clientWidth;
    for (let i = 0; i < this.children.length; i++) {
      let child = this.children[i];
      addClass(child, 'slider-item');
      child.style.width = sliderWidth + 'px';
      child.style.height = height + 'px';
      width += sliderWidth;
    }
    if (this.props.loop) {
      width += sliderWidth * 2;
    }
    document.getElementById('sliderGroup').style.width = width + 'px';
    document.getElementById('sliderGroup').style.height = height + 'px';
  }

  _initScroll() {
    this.scroll = new BScroll(document.getElementById('slider'), {
      scrollX: true,
      scrollY: false,
      momentum: false,
      snap: true,
      snapLoop: this.props.loop,
      snapThreshold: 0.3,
      snapSpeed: 400
    });
    this.scroll.on('scrollEnd', () => {
      let index = this.scroll.getCurrentPage().pageX;
      if (this.props.loop) {
        index -= 1
      }
      this.currentIndex = index;
      if (this.props.autoPlay) {
        this._play();
      }
    });
    this.scroll.on('touchend ', () => {
      if (this.props.autoPlay) {
        this._play();
      }
    });
    this.scroll.on('beforeScrollStart', () => {
      if (this.props.autoPlay) {
        clearTimeout(this.sliderTimer)
      }
    });
  }

  _initDots() {
    this.dots = new Array(this.children.length);
  }

  _play() {
    let index = this.currentIndex + 1;
    if (this.props.loop) {
      index += 1;
      clearTimeout(this.sliderTimer);
      this.sliderTimer = setTimeout(() => {
        this.scroll.goToPage(index, 0, 400)
      }, this.props.interval);
    }
  }


  componentDidMount() {
    setTimeout(() => {
      this._setSliderWidthAndHeight();
      this._initDots();
      this._initScroll();
      if (this.props.loop) {
        this._play();
      }
    }, 500);
  }

  render() {

    return (
      <div className="slider" id="slider">
        <div className="slider-group" id="sliderGroup">
          {
            this.props.topList.map((topStory) => {
              return (
                <div className="pic" style={this._getBackground(topStory.image)} key={topStory.id}>
                  <em>{topStory.title}</em>
                </div>
              )
            })
          }
        </div>
        <div className="dots">
          <span className="dot"/>
        </div>
      </div>
    );
  }
}

export default Banner;