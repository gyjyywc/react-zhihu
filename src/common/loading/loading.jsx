import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './loading.styl';

class Loading extends Component {

  static defaultProps = {
    title: '正在载入...'
  };

  static propTypes = {
    title: PropTypes.string.isRequired
  };

  static hideLoading(id) {
    document.getElementById(id).style.display = 'none';
  }

  static showLoading(id) {
    document.getElementById(id).style.display = 'block';
  }

  render() {
    return (
      <div className="loading">
        <img width="24" height="24" src={require('./loading.gif')} alt="加载中" />
        <p className="desc">{this.props.title}</p>
      </div>
    );
  }
}

export default Loading;