import React, {Component} from 'react';
import MHeader from 'common/m-header/m-header';
import ListView from 'common/list-view/list-view';
import Scroll from 'common/scroll/scroll';
import Loading from 'common/loading/loading'
import {getThemeNews} from 'api/index';

class themeIndex extends Component {

  state = {
    themeData: [],
    editors: [],
    bannerImg: '',
    headerTitle: '',
    description: '',
  };

  componentWillMount() {
    getThemeNews(this.props.match.params.themesId)
      .then((response) => {
        this.setState({
          themeData: response.stories,
          editors: response.editors,
          bannerImg: response.image,
          headerTitle: response.name,
          description: response.description,
        });
        // Loading.hideLoading('loadingWrapper');
      })
      .catch((error) => {
        console.error('内部错误，错误原因: ' + error);
      })
  }

  handleClickOfMHeader() {}

  handleDoubleClick() {}

  render() {
    return (
      <div>
        <MHeader title={this.state.headerTitle}
                 icon="icon-add"
                 emitClick={this.handleClickOfMHeader.bind(this)}
                 emitDoubleClick={this.handleDoubleClick.bind(this)} />
      </div>
    );
  }
}

export default themeIndex;