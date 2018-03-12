import React, {Component} from 'react';
import './list-view.styl';
import PropTypes from 'prop-types';

class ListView extends Component {

  // 定义默认值
  static defaultProps = {
    viewList: []
  };

  // 定义类型
  static propTypes = {
    viewList: PropTypes.array.isRequired
  };

  render() {

    let view = this.props.viewList.map((viewItem) => {
      return (
        <div className="list-item" key={viewItem.id}>
          <em>{viewItem.title}</em>
          <img src={viewItem.images[0]} alt="" />
        </div>
      );
    });

    return (
      <div className="list-wrapper">
        {view}
      </div>
    );
  }
}

export default ListView;