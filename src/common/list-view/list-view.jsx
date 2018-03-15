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

  emit(viewItem, history) {
    this.props.emit(viewItem, history);
  }

  render() {
    let dateTitle;
    if (this.props.date) {
      let year = this.props.date.substr(0, 4);
      let month = this.props.date.substr(4, 2);
      let day = this.props.date.substr(6, 2);
      let date = year + '-' + month + '-' + day + ' 00:00:00';
      let latestDate = new Date(date).getTime();
      let now = new Date().getTime();
      let days = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'];
      let dayStr = days[new Date(date).getDay() - 1];
      if ((now - latestDate) / 1000 / 60 / 60 < 30) {
        dateTitle = '今日热闻';
      } else {
        dateTitle = `${month}月${day}日 ${dayStr}`
      }
    }

    let view;
    if (this.props.viewList) {
      view = this.props.viewList.map((viewItem) => {
        return (
          <div className="list-item" key={viewItem.id} onClick={() => this.emit(viewItem, this.props.history)}>
            <em>{viewItem.title}</em>
            <img src={viewItem.images[0]} alt="" />
          </div>
        );
      });
    }


    return (
      <div className="list-wrapper">
        <p className="list-date">{dateTitle}</p>{view}
      </div>
    );
  }
}

export default ListView;