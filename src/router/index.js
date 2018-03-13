import React, {Component} from 'react';
import {HashRouter, Switch, Route, Redirect} from 'react-router-dom';
import asyncComponent from '../utils/asyncComponent';

import Splash from "components/splash/splash";

const Index = asyncComponent(() => import("components/index/index"));
const News = asyncComponent(() => import("components/news/news"));

// react-router4 不再推荐将所有路由规则放在同一个地方集中式路由，子路由应该由父组件动态配置，组件在哪里匹配就在哪里渲染，更加灵活
class RouteConfig extends Component {
  render() {
    return (
      <HashRouter>
        <Switch>
          <Route path="/" exact component={Splash}/>
          <Route path="/index" component={Index}/>
          <Route path="/news/:newsId" component={News}/>
          <Redirect to="/"/>
        </Switch>
      </HashRouter>
    )
  }
}

export default RouteConfig;