import './App.css';
import React from 'react';
import { Switch, Route } from 'react-router-dom';

import ReportView from './ReportView';
import AccountView from './AccountView';
import TestAppBar from './AppBar';
import SimpleIframe from './SimpleIframe';

function App() {

  return (
    <div className="App">
      <TestAppBar />
      <Switch>
        <Route path={'/'} exact={true} component={ReportView} />
        <Route path={'/report'} exact={true} component={ReportView} />
        <Route path={'/account-view'} exact={true} component={AccountView} />
        <Route path={'/simple-iframe'} exact={true} component={SimpleIframe} />
      </Switch>
    </div >
  );
}

export default App;
