import React, {Component} from 'react';
import './list-view.styl';

class ListView extends Component {

  emitClick(viewItem) {
    this.props.listViewData.handleClick(viewItem);
  }

  formatStringDate(item) {
    let year = item.substr(0, 4);
    let month = item.substr(4, 2);
    let day = item.substr(6, 2);
    let date = year + '-' + month + '-' + day + ' 00:00:00';
    let latestDate = new Date(date).getTime();
    let now = new Date().getTime();
    let days = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
    let dayStr = days[new Date(date).getDay()];
    if ((now - latestDate) / 1000 / 60 / 60 < 30) {
      return '今日热闻';
    } else {
      return `${month}月${day}日 ${dayStr}`
    }
  }

  render() {
    let views;
    if (this.props.listViewData.viewList) {
      let view;
      views = this.props.listViewData.viewList.map((viewItem, index) => {
        if (!viewItem.id) {
          view = (
            <p className="list-date"
               key={index}>
              {this.formatStringDate(viewItem.date)}
            </p>
          );
        } else if (viewItem.images) {
          view = (
            <div className="list-item__with-img"
                 key={viewItem.id + '-' + index}
                 onClick={() => this.emitClick(viewItem)}>
              <em>{viewItem.title}</em>
              <img src={viewItem.images[0]} alt="" />
            </div>
          );
        } else if (!viewItem.image && !viewItem.images) {
          view = (
            <div className="list-item__without-img"
                 key={viewItem.id + '-' + index}
                 onClick={() => this.emitClick(viewItem)}>
              <em>{viewItem.title}</em>
            </div>
          );
        }
        return view;
      });
    }


    return (
      <div className="list-wrapper">
        {views}
      </div>

    );
  }
}

export default ListView;