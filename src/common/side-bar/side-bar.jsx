import React, {Component} from 'react';

class SideBar
  extends Component {
  render() {
    return (
      <div>
        <div className="side-header"></div>
        <div className="side-nav"></div>
        <div className="side-home"></div>
        <ul className="theme-wrapper"></ul>
      </div>
    );
  }
}

export default SideBar;