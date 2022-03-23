import React from 'react';
import { Router, Switch } from 'react-router-dom';
import { createBrowserHistory as createHistory } from 'history';
import PublicRoute from './PublicRoute';
import  '../Components/editor.css';
import Finance from '../Components/Financ';
import Home from '../Components/Home'

export const history = createHistory();
class AppRouter extends React.Component {

  render() {
    return (
      <Router history={history} > 
        <div>
          <Switch>
            <PublicRoute path="/" component={Home} exact={true} />
            <PublicRoute path="/finance" component={Finance} exact={true}/>
          </Switch>
        </div>
      </Router>
    )
  }
};
export default AppRouter;
