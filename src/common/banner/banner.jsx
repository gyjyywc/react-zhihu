import React, {Component} from 'react';
import BScroll from 'better-scroll';
import {windowWith, addClass} from 'assets/js/dom';
// import {getImage} from 'assets/js/common';
import PropTypes from 'prop-types';
import './banner.styl';

class Banner extends Component {

  state = {
    dots: [],
    currentIndex: 0
  };

  // 定义默认值
  static defaultProps = {
    topList: [],
    loop: true,
    autoPlay: false,
    interval: 4000
  };

  PERCENT = 0.613;

  // 定义类型
  static propTypes = {
    topList: PropTypes.array.isRequired,
    loop: PropTypes.bool,
    autoPlay: PropTypes.bool,
    interval: PropTypes.number,
  };

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

  _getBackground(url) {
    // 通过 <meta name="referrer" content="never"> 解决了
    // let css = getImage(url);
    return {
      backgroundImage: `url("${url}")`
    };
  }

  _setSliderWidthAndHeight() {
    this.children = document.getElementById('sliderGroup').children;
    let width = 0;
    let height = Math.round(windowWith * this.PERCENT);
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
      this.setState({
        currentIndex: index
      });
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
    // 保证模板里 key 值取 id 为唯一值
    this.setState({
      dots: Array.from(this.children).map((child, index) => {
        return {
          id: index
        };
      })
    });
  }

  _play() {
    let index = this.state.currentIndex + 1;
    if (this.props.loop) {
      index += 1;
      clearTimeout(this.sliderTimer);
      this.sliderTimer = setTimeout(() => {
        this.scroll.goToPage(index, 0, 400)
      }, this.props.interval);
    }
  }

  render() {

    let topStoryPic = this.props.topList.map((topStory) => {
      return (
        <div key={topStory.id}>
          <a>
            <img src={topStory.image} alt="" />
            <em>{topStory.title}</em>
          </a>
        </div>
      );
    });

    let dots = this.state.dots.map((dot, index) => {
      let dotElement;
      if (this.state.currentIndex === index) {
        dotElement = <span className="dot active" key={index} />;
      } else {
        dotElement = <span className="dot" key={index} />
      }
      return (dotElement);

    });

    return (
      <div className="slider" id="slider">
        <div className="slider-group" id="sliderGroup">
          {topStoryPic}
        </div>
        <div className="dots">
          {dots}
        </div>
      </div>
    );
  }
}

export default Banner;