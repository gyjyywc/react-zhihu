import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './list-view.styl';

class ListView extends Component {

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
    let editors;
    let views;
    // 主题部分头部的主编部分
    if (this.props.listViewData.editors) {
      let editor;
      editors = (
        <div className="list-editors">
          {
            this.props.listViewData.editors.map((item, index) => {
              if (index === 0) {
                editor = (
                  <span key={item.id + '-' + index}>
              <em>主编</em>
              <img src={item.avatar.replace(/^\w+/, 'https')} alt="" />
            </span>
                );
              } else {
                editor = (
                  <img key={item.id + '-' + index} src={item.avatar.replace(/^\w+/, 'https')} alt="" />
                );
              }
              return editor;
            })
          }
        </div>
      );
    }
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
            <Link className="list-item__with-img"
                  key={viewItem.id + '-' + index}
                  to={'/news/' + viewItem.id}>
              <em>{viewItem.title}</em>
              <img src={viewItem.images[0].replace(/^\w+/, 'https')} alt="" />
            </Link>
          );
        } else if (!viewItem.image && !viewItem.images) {
          view = (
            <Link className="list-item__without-img"
                  key={viewItem.id + '-' + index}
                  to={'/news/' + viewItem.id}>
              <em>{viewItem.title}</em>
            </Link>
          );
        }
        return view;
      });
    }


    return (
      <div className="list-wrapper">
        {editors}
        {views}
      </div>

    );
  }
}

export default ListView;