import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import { Provider } from 'mobx-react'
import appStore from '../stores/AppStore'
import Home from './Home'
import Test from './Test'
import PrimaryMenu from './layout/PrimaryMenu'
import Footer from './layout/Footer'

const supportsHistory = 'pushState' in window.history
const stores = { appStore }

class App extends Component {
  render() {
    return (
      <Provider {...stores}>
        <Router forceRefresh={!supportsHistory}>
          <div className="wrapper">
            <PrimaryMenu></PrimaryMenu>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/test" component={Test} />
              <Route component={Home}/>
            </Switch>
            <Footer></Footer>
          </div>
        </Router>
      </Provider>
    )
  }
}

export default App