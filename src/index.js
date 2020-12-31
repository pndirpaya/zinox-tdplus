import React from 'react';
import ReactDOM from 'react-dom';
import UIkit from 'uikit';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// eslint-disable-next-line
import Style from 'uikit/dist/css/uikit.min.css';
import Icons from 'uikit/dist/js/uikit-icons';
import './zinox-tdplus.css'
import App from './App';
import Dashboard from './Dashboard';
import Error404 from './Error404';

UIkit.use(Icons);

const MainApp = () => {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/" exact component={App} />
          <Route path="/dashboard" exact component={Dashboard} />
          <Route component={Error404} />
        </Switch>
      </div>
    </Router>
  )
}

  ReactDOM.render(
    <MainApp />,
    document.getElementById('root')
  );

