import React, { Component } from 'react'
import './App.css'
import { hot } from 'react-hot-loader'
import { Switch, Route } from 'react-router-dom'
import Login from '../../features/account/Login'
import CreateAccount from '../../features/account/CreateAccount'

class NotLoggedApp extends Component {
  render() {
    return (
      <Switch>
        <Route exact path='/createaccount' component={CreateAccount} />
        <Route path='/' component={Login} />
      </Switch>
    );
  }
}

export default hot(module)(NotLoggedApp)

