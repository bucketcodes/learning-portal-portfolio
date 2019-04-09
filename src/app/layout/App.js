import React, { Component } from 'react'
import './App.css'
import { hot } from 'react-hot-loader'
import Home from '../../features/home/Home'
import SearchLessons from '../../features/lessons/search/SearchLessons'
import { Switch, Route } from 'react-router-dom'
import Lesson from '../../features/lesson/Lesson'
import CreateLesson from '../../features/lesson/CreateLesson'
import Login from '../../features/account/Login'
import CreateAccount from '../../features/account/CreateAccount'
import TeacherDashboard from '../../features/dashboard/TeacherDashboard'
import EditLesson from '../../features/lesson/EditLesson'
import EditProfile from '../../features/profile/EditProfile'
import Resources from '../../features/resources/Resources'

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/lessons' component={SearchLessons} />
        <Route path='/lesson/:id/:uid' component={Lesson} />
        <Route path='/createlesson' component={CreateLesson} />
        <Route path='/login' component={Login} />
        <Route path='/createaccount' component={CreateAccount} />
        <Route path='/dashboard' component={TeacherDashboard} />
        <Route path='/edit/:id/:uid' component={EditLesson} />
        <Route path='/profile/edit' component={EditProfile} />
        {/* Work in Progress */}<Route path='/resources' component={Resources} />
      </Switch>
    );
  }
}

export default hot(module)(App)

