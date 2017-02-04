import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import { Provider } from 'mobx-react'
import appStore from '../stores/AppStore'
import fireStore from '../stores/FireStore'
import Home from './Home'
import Todos from './todos/Todos'
import PrimaryMenu from './layout/PrimaryMenu'
import Footer from './layout/Footer'

const supportsHistory = 'pushState' in window.history
const stores = { appStore, fireStore }

class App extends Component {
  render() {
    return (
      <Provider {...stores}>
        <Router forceRefresh={!supportsHistory}>
          <div className="wrapper">
            <PrimaryMenu></PrimaryMenu>
            <div className="ui container">
              <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/todos" component={Todos} />
                <Route component={Home}/>
              </Switch>
            </div>
            <Footer></Footer>
          </div>
        </Router>
      </Provider>
    )
  }
}

export default App