import React, {Component} from 'react';
import BScroll from 'better-scroll';

class Scroll extends Component {

  static defaultProps = {
    scrollConfig: {
      probeType: 1,
      click: true,
      data: [],
      refreshDelay: 300,
    },
    scrollEvent: {
      listenScroll: false,
      pullup: true,
      beforeScroll: false
    }
  };

  componentDidMount() {
    setTimeout(() => {
      this.initScroll();
    }, this.props.BScroll.refreshDelay);
  }

  shouldComponentUpdate() {
    setTimeout(() => {
      this.refresh();
    }, this.props.BScroll.refreshDelay);
    return true;
  }

  initScroll() {
    let wrapper = document.getElementById('scrollWrapper');
    if (!wrapper) {
      return;
    }
    this.scroll = new BScroll(wrapper, {
      probeType: this.props.BScroll.probeType,
      click: this.props.BScroll.click,
    });
    if (this.props.BScroll.listenScroll) {
      this.scroll.on('scroll', (pos) => {
        this.props.BScroll.scroll(pos);
      });
    }
      console.log(this.props.BScroll)
    if (this.props.BScroll.pullup) {
      this.scroll.on('scrollEnd', () => {
        if (this.scroll.y <= (this.scroll.maxScrollY + 50)) {
          this.props.BScroll.scrollToEnd();
        }
      });
    }
    if (this.props.BScroll.beforeScroll) {
      this.scroll.on('beforeScrollStart', () => {
        this.props.BScroll.beforeScroll();
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