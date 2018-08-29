import React, { Component } from 'react';
import { prefixStyle } from 'assets/js/utils';
import './splash.styl';

class Splash extends Component {

  static transform = prefixStyle('transform');

  componentDidMount() {
    setTimeout(() => {
      document.getElementById('splashImg').style[Splash.transform] = 'scale(1.1)'
    }, 1);
    setTimeout(() => {
      this.props.history.push('/index');
    }, 1700); // 1700ms 是让动画有充足的时间
  }

  render() {
    const splashImg = require('./splash.jpg');
    return (
        <div className="splash-wrapper">
          <img className="splash" id="splashImg" src={ splashImg } alt="你,的名字." />
        </div>
    );
  }
}

export default Splash;