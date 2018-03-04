import './splash.styl';
import React, {Component} from 'react';
import {prefixStyle} from 'assets/js/dom';

const TRANSFORM = prefixStyle('transform');

class Splash extends Component {

  componentDidMount() {
    setTimeout(() => {
      document.getElementById('splashImg').style[TRANSFORM] = 'scale(1.1)'
    }, 1);
    setTimeout(() => {
      this.props.history.push('/index');
    }, 1700); // 1700ms 是让动画有充足的时间
  }

  render() {
    return (
      <div className="splash-wrapper">
        <img className="splash" id="splashImg" src={require('./splash.jpg')} alt="你,的名字."/>
      </div>
    );
  }
}

export default Splash;