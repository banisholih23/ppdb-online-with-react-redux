import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Provider } from 'react-redux'

import store from './redux/store'

import Welcome from './pages/Welcome'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'

class App extends Component {
  render() {
    return (
      <>
        <Provider  store={store}>
          <Router>
            <Switch>
              <Route path='/login' component={Login} />
              <Route path='/register' component={Register} />
              <Route path='/home' component={Home} />
              <Route path='/' component={Welcome} />
            </Switch>
          </Router>
        </Provider>
      </>
    )
  }
}

export default App