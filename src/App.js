import './App.css';
import React, { useState, useEffect } from 'react';
import { Switch, Route, Redirect, useLocation } from 'react-router-dom';

import ReportView from './ReportView';
import AccountView from './AccountView';
import TestAppBar from './AppBar';

function App() {

  return (
    <div className="App">
      <TestAppBar />
      <Switch>
        <Route path={'/'} exact={true} component={ReportView} />
        <Route path={'/report'} exact={true} component={ReportView} />
        <Route path={'/account-view'} exact={true} component={AccountView} />
      </Switch>
    </div >
  );
}

export default App;
