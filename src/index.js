import 'assets/stylus/index.styl';

import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import fastclick from 'fastclick';
import { AppContainer } from 'react-hot-loader';
import Router from './router/index';


fastclick.attach(document.body);

const render = Component => {
  ReactDOM.render(
    //绑定redux、热加载
      <AppContainer>
        <Component />
      </AppContainer>,
    document.getElementById('root'),
  )
};

render(Router);

// Webpack Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./router/', () => {
    render(Router);
  })
}

// ReactDOM.render(<Splash />, document.getElementById('root'));

registerServiceWorker();
