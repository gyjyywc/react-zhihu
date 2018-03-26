import React, {Component} from 'react';
import BScroll from 'better-scroll';
import PropTypes from 'prop-types';

class Scroll extends Component {

  static defaultProps = {
    className: '',
    id: '',
    refreshFlag: 0,
    probeType: 2,
    click: true,
    bounceTime: 700,
    refreshDelay: 300,
    scrollEvent: {},
    hand: () => {}
  };

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
    let wrapper = document.getElementById(this.props.id);
    if (!wrapper) {
      return;
    }
    this.scroll = new BScroll(wrapper, {
      probeType: this.props.probeType,
      click: this.props.click,
      bounceTime: this.props.bounceTime
    });
    if (this.props.scrollEvent.scroll) {
      this.scroll.on('scroll', (position) => {
        this.props.scrollEvent.scroll(position);
      });
    }
    if (this.props.scrollEvent.scrollToEnd) {
      this.scroll.on('scrollEnd', (position) => {
        if (this.scroll.y <= (this.scroll.maxScrollY + 50)) {
          this.props.scrollEvent.scrollToEnd(position);
        }
      });
    }
    if (this.props.scrollEvent.touchEnd) {
      this.scroll.on('touchEnd', (position) => {
        this.props.scrollEvent.touchEnd(position);
      });
    }
    if (this.props.scrollEvent.beforeScroll) {
      this.scroll.on('beforeScrollStart', () => {
        this.props.scrollEvent.beforeScroll();
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

  scrollToElement() {
    this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments);
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