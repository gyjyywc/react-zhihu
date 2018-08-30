import './assets/stylus/index.styl'
import { AppContainer } from 'react-hot-loader'
import { Provider } from 'react-redux'
import React from 'react'
import ReactDOM from 'react-dom'
import store from './store'
import fastclick from 'fastclick'
import Router from './router/index'

fastclick.attach(document.body)

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <Component />
      </Provider>
    </AppContainer>,
    document.getElementById('root')
  )
}

render(Router)
