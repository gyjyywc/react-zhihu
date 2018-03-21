import React, {Component} from 'react';
import BScroll from 'better-scroll';

class Scroll extends Component {

  static defaultProps = {
    probeType: 1,
    click: true,
    data: [],
    refreshDelay: 300,
    scrollEvent: {}
  };

  state = {
    isBottom: false
  };

  componentDidMount() {
    setTimeout(() => {
      this.initScroll();
    }, this.props.refreshDelay);
  }

  shouldComponentUpdate() {
    setTimeout(() => {
      this.refresh();
    }, this.props.refreshDelay);
    return true;
  }

  initScroll() {
    let wrapper = document.getElementById('scrollWrapper');
    if (!wrapper) {
      return;
    }
    this.scroll = new BScroll(wrapper, {
      probeType: this.props.probeType,
      click: this.props.click,
    });
    if (this.props.scrollEvent.scroll) {
      this.scroll.on('scroll', (pos) => {
        this.props.scrollEvent.scroll(pos, this.scroll);
      });
    }
    if (this.props.scrollEvent.scrollToEnd) {
      this.scroll.on('scrollEnd', () => {
        if (this.scroll.y <= (this.scroll.maxScrollY + 50)) {
          this.props.scrollEvent.scrollToEnd();
        }
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
      <div className="scroll-wrapper" id="scrollWrapper">
        <div>{this.props.children}</div>
      </div>
    );
  }
}

export default Scroll;