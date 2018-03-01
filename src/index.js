import React from 'react';
import ReactDOM from 'react-dom';
import Splash from 'components/splash/splash';
import 'assets/stylus/index.styl'
import fastclick from 'fastclick'
import registerServiceWorker from './registerServiceWorker';


fastclick.attach(document.body);

ReactDOM.render(<Splash />, document.getElementById('root'));

registerServiceWorker();
