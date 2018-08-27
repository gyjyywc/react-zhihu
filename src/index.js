import './assets/stylus/index.styl';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import store from './store'
import fastclick from 'fastclick';
import Router from './router/index';

fastclick.attach(document.body);

const render = Component => {
    ReactDOM.render(
        <Provider store={store}>
            <Component/>
        </Provider >,
        document.getElementById('root'),
    )
};

render(Router);
