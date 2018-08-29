import React, { Component } from 'react';
import BScroll from 'better-scroll';
import PropTypes from 'prop-types';

class Scroll extends Component {
  // 定义类型
  static propTypes = {
    id: PropTypes.string.isRequired,
    className: PropTypes.string,
    refreshFlag: PropTypes.number,
    probeType: PropTypes.number,
    click: PropTypes.bool,
    data: PropTypes.array,
    refreshDelay: PropTypes.number,
    scrollEvent: PropTypes.object,
  };

  static defaultProps = {
    className: '',
    id: '',
    refreshFlag: 0,
    probeType: 2,
    click: true,
    bounceTime: 700,
    refreshDelay: 300,
    scrollEvent: {}
  };

  static scroll;

  componentDidMount() {
    setTimeout(() => {
      this.initScroll();
    }, this.props.refreshDelay);
  }

  componentWillReceiveProps() {
    setTimeout(() => {
      this.refresh();
    }, this.props.refreshDelay);
  }

  initScroll() {
    const {
      id,
      click,
      probeType,
      bounceTime,
      scrollEvent
    } = this.props;
    let wrapper = document.getElementById(id);
    if (!wrapper) {
      return;
    }
    this.scroll = new BScroll(wrapper, {
      probeType: probeType,
      click: click,
      bounceTime: bounceTime
    });
    if (scrollEvent.scroll) {
      this.scroll.on('scroll', (position) => {
        scrollEvent.scroll(position);
      });
    }
    if (scrollEvent.scrollToEnd) {
      this.scroll.on('scrollEnd', (position) => {
        if (this.scroll.y <= (this.scroll.maxScrollY + 50)) {
          scrollEvent.scrollToEnd(position);
        }
      });
    }
    if (scrollEvent.touchEnd) {
      this.scroll.on('touchEnd', (position) => {
        scrollEvent.touchEnd(position);
      });
    }
    if (scrollEvent.beforeScroll) {
      this.scroll.on('beforeScrollStart', () => {
        scrollEvent.beforeScroll();
      });
    }
  }

  enable() {
    this.scroll && this.scroll.enable();
  }

  disable() {
    this.scroll && this.scroll.disable();
  }

  refresh() {
    this.scroll && this.scroll.refresh();
  }

  scrollTo() {
    this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments);
  }

  // 绑定到当前组件上，方便调用
  scrollToElement() {
    this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments);
  }

  render() {
    const { className, id, children } = this.props;
    return (
        <div className={ className } id={ id }>
          <div>{ children }</div>
        </div>
    );
  }
}

export default Scroll;