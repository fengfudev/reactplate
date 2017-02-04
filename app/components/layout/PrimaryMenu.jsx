import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { inject, observer } from 'mobx-react'

@inject('appStore', 'fireStore') @observer
export default class PrimaryMenu extends Component {
  state = { activeItem: 'todos' }

  handleItemClick = (e) => {
    // e.preventDefault();
    this.setState({ activeItem: e.target.name })
  }

  componentDidMount() {
    $('.ui.dropdown').dropdown()
  }

  componentWillUnmount() {
    $('.ui.dropdown').dropdown()
  }

  itemClass = (item) => {
    return 'item ' + (this.state.activeItem === item ? 'active' : '');
  }

  render() {
    const { activeItem } = this.state

    return (
      <div className="primary-menu ui inverted stackable menu" style={styles.primaryMenu}>
        <div className="ui container">
          <div className="header item">
            Reactplate
          </div>
          <Link to="/" className={this.itemClass('home')} name="home" onClick={this.handleItemClick}>
            Home
          </Link>
          <Link to="/todos" className={this.itemClass('todos')} name="todos" onClick={this.handleItemClick}>
            Todos
          </Link>
          <div className="right item">
            <div className="primary button">Sign In</div>
          </div>
          <div className="item">
            <div className="primary button">Sign Up</div>
          </div>
        </div>
      </div>
    )
  }
}

const styles = {
  primaryMenu: {
    borderRadius: 0
  }
}