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
import CreateJobTicket from './CreateJobTicket';
import CreateJobTicketForm from './CreateJobTicketForm';
import CreateOfflineJobTicket from './CreateOfflineJobTicket';
import UpdateTicket from './UpdateTicket';
import Search from './Search';
import Tracker from './Tracker';
import PartOrder from './PartOrder';
import CloseTicketSearch from './CloseTicketSearch';
import CloseTicket from './CloseTicket';
import Error404 from './Error404';
import ManageUser from './ManageUsers';
import EditUser from './EditUser';
import ManageEngineer from './ManageEngineer';
import EditEngineer from './EditEngineer';
import ManageDepartment from './ManageDepartment';
import EditDepartment from './EditDepartment';
import Reports from './Reports';







UIkit.use(Icons);

const MainApp = () => {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/" exact component={App} />
          <Route path="/dashboard" exact component={Dashboard} />
          <Route path="/create-job" exact component={CreateJobTicket} />
          <Route path="/create-job/:id" exact component={CreateJobTicketForm} />
          <Route path="/create-job-offline" exact component={CreateOfflineJobTicket} />
          <Route path="/search" exact component={Search} />
          <Route path="/close-ticket-search" exact component={CloseTicketSearch} />
          <Route path="/close-ticket/:id" exact component={CloseTicket} />
          <Route path="/update/:id" exact component={UpdateTicket} />
          <Route path="/tracker/:id" exact component={Tracker} />
          <Route path="/part-order/:id" exact component={PartOrder} />
          <Route path="/manage-user" exact component={ManageUser} />
          <Route path="/edit-user/:id" exact component={EditUser} />
          <Route path="/manage-engineer" exact component={ManageEngineer} />
          <Route path="/edit-engineer/:id" exact component={EditEngineer} />
          <Route path="/manage-department" exact component={ManageDepartment} />
          <Route path="/edit-department/:id" exact component={EditDepartment} />
          <Route path="/reports" exact component={Reports} />




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

