import BScroll from 'better-scroll';
import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {addClass} from 'assets/js/utils';
import PropTypes from 'prop-types';
import './banner.styl';

class Banner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dots: [],
      currentIndex: 0
    };
  }

  // 定义默认值
  static defaultProps = {
    bannerData: {
      topList: []
    },
    loop: true,
    autoPlay: true,
    interval: 4000,
    threshold: 0.3,
    speed: 400
  };

  static percent = 0.613;
  static initDelay = 300;

  // 定义类型
  static propTypes = {
    bannerData: PropTypes.object.isRequired,
    loop: PropTypes.bool,
    autoPlay: PropTypes.bool,
    interval: PropTypes.number,
    threshold: PropTypes.number,
    speed: PropTypes.number
  };

  // 慢网速下也能正确渲染banner
  componentWillReceiveProps(nextProps) {
    if (this.props.bannerData.topList.length !== nextProps.bannerData.topList.length) {
      this.update();
    }
  }

  update() {
    if (this.scroll) {
      this.scroll.destroy();
    }
    setTimeout(() => {
      this.init();
    }, Banner.initDelay);
  }

  init() {
    clearTimeout(this.timer);
    this.setState({
      currentIndex: 0
    });
    this.setSliderWidthAndHeight();
    this.initDots();
    this.initScroll();
    if (this.props.autoPlay) {
      this.play();
    }
  }

  setSliderWidthAndHeight() {
    this.children = document.getElementById('sliderGroup').children;
    // 数据加载完才显示
    if (this.props.bannerData.topList.length) {
      let width = 0;
      let height = Math.round(window.innerWidth * Banner.percent);
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
      let sliderGroup = document.getElementById('sliderGroup');
      sliderGroup.style.width = width + 'px';
      sliderGroup.style.height = height + 'px';
    }
  }

  initScroll() {
    this.scroll = new BScroll(document.getElementById('slider'), {
      scrollX: true,
      scrollY: false,
      momentum: false,
      snap: {
        loop: this.props.loop,
        threshold: this.props.threshold,
        speed: this.props.speed
      },
      bounce: false
    });
    this.scroll.on('scrollEnd', () => {
      let index = this.scroll.getCurrentPage().pageX;
      this.setState({
        currentIndex: index
      });
      if (this.props.autoPlay) {
        this.play();
      }
    });
    this.scroll.on('touchend ', () => {
      if (this.props.autoPlay) {
        this.play();
      }
    });
    this.scroll.on('beforeScrollStart', () => {
      if (this.props.autoPlay) {
        clearTimeout(this.timer)
      }
    });
  }

  initDots() {
    // 保证模板里 key 值取 id 为唯一值
    this.setState({
      dots: Array.from(this.children).map((child, index) => {
        return {
          id: index
        };
      })
    });
  }

  play() {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.scroll.next();
    }, this.props.interval);
  }

  render() {
    // 先隐藏，然后通过 setSliderWidthAndHeight 添加 slider-item 类名后显示，保证低网速下体验
    let style = {
      display: 'none'
    };

    let topStoryPic = this.props.bannerData.topList.map((topStory) => {
      return (
        <div key={topStory.id}>
          <Link style={style} to={'/news/' + topStory.id}>
            <img src={topStory.image.replace(/^\w+/, 'https')} alt="" />
            <em>{topStory.title}</em>
          </Link>
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