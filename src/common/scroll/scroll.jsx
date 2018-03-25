import React, {Component} from 'react';
import BScroll from 'better-scroll';
import PropTypes from 'prop-types';

class Scroll extends Component {

  static defaultProps = {
    className: '',
    id: '',
    probeType: 2,
    click: true,
    bounceTime: 700,
    refreshDelay: 300,
    scrollEvent: {}
  };

  // 定义类型
  static propTypes = {
    id: PropTypes.string.isRequired,
    className: PropTypes.string,
    probeType: PropTypes.number,
    click: PropTypes.bool,
    data: PropTypes.array,
    refreshDelay: PropTypes.number,
    scrollEvent: PropTypes.object,
  };

  static scroll;

  componentDidMount() {
    setTimeout(() => {
      this.initScroll();
    }, this.props.refreshDelay);
  }

  shouldComponentUpdate() {
    setTimeout(() => {
      Scroll.refresh();
    }, this.props.refreshDelay);
    return true;
  }

  initScroll() {
    let wrapper = document.getElementById(this.props.id);
    if (!wrapper) {
      return;
    }
    Scroll.scroll = new BScroll(wrapper, {
      probeType: this.props.probeType,
      click: this.props.click,
      bounceTime: this.props.bounceTime
    });
    if (this.props.scrollEvent.scroll) {
      Scroll.scroll.on('scroll', (position) => {
        this.props.scrollEvent.scroll(position);
      });
    }
    if (this.props.scrollEvent.scrollToEnd) {
      Scroll.scroll.on('scrollEnd', (position) => {
        if (Scroll.scroll.y <= (Scroll.scroll.maxScrollY + 50)) {
          this.props.scrollEvent.scrollToEnd(position);
        }
      });
    }
    if (this.props.scrollEvent.touchEnd) {
      Scroll.scroll.on('touchEnd', (position) => {
        this.props.scrollEvent.touchEnd(position);
      });
    }
    if (this.props.scrollEvent.beforeScroll) {
      Scroll.scroll.on('beforeScrollStart', () => {
        this.props.scrollEvent.beforeScroll();
      });
    }
  }

  static enable() {
    Scroll.scroll && Scroll.scroll.enable();
  }

  static disable() {
    Scroll.scroll && Scroll.scroll.disable();
  }

  static refresh() {
    Scroll.scroll && Scroll.scroll.refresh();
  }

  static scrollTo(x, y) {
    Scroll.scroll && Scroll.scroll.scrollTo(x, y);
  }

  static scrollToElement(el, time, offsetX, offsetY, easin) {
    console.log(el)
    console.log(time)
    Scroll.scroll && Scroll.scroll.scrollToElement(el, time, offsetX, offsetY, easin);
  }

  render() {
    return (
      <div className={this.props.className} id={this.props.id}>
        <div>{this.props.children}</div>
      </div>
    );
  }
}

export default Scroll;