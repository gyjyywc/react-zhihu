import React, {Component} from 'react';
import BScroll from 'better-scroll';

class Scroll extends Component {

  static defaultProps = {
    probeType: 1,
    click: true,
    direction: this.DIR_VERTICAL,
    data: [],
    refreshDelay: 20,
    listenScroll: false,
    pullup: false,
    beforeScroll: false
  };

  DIR_VERTICAL = 'vertical';
  DIR_HORIZONTAL = 'horizontal';

  componentDidMount() {
    setTimeout(() => {
      this.initScroll();
    }, this.props.refreshDelay)
  }

  shouldComponentUpdate() {
    setTimeout(() => {
      this.refresh()
    }, this.props.refreshDelay)
  }

  initScroll() {
    let wrapper = document.getElementById('scrollWrapper');
    if (!wrapper) {
      return;
    }
    this.scroll = new BScroll(wrapper, {
      probeType: this.props.probeType,
      click: this.props.click,
      eventPassthrough: this.direction === this.DIR_VERTICAL ? this.DIR_HORIZONTAL : this.DIR_VERTICAL
    });
    if (this.props.listenScroll) {
      this.scroll.on('scroll', (pos) => {
        this.$emit('scroll', pos)
      })
    }
    if (this.props.pullup) {
      this.scroll.on('scrollEnd', () => {
        if (this.scroll.y <= (this.scroll.maxScrollY + 50)) {
          this.$emit('scrollToEnd')
        }
      })
    }
    if (this.props.beforeScroll) {
      this.scroll.on('beforeScrollStart', () => {
        this.$emit('beforeScroll')
      })
    }
  }

  static enable() {
    this.scroll && this.scroll.enable()
  }

  static disable() {
    this.scroll && this.scroll.disable()
  }

  static refresh() {
    this.scroll && this.scroll.refresh()
  }

  static scrollTo() {
    this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
  }

  static scrollToElement() {
    this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
  }

  render() {
    return (
      <div className="scroll-wrapper" id="scrollWrapper" />
    );
  }
}

export default Scroll;