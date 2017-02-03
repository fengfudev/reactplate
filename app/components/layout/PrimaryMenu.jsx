import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

export default class PrimaryMenu extends Component {
  state = { activeItem: 'message' }

  handleItemClick = (e) => {
    // e.preventDefault();
    this.setState({ activeItem: e.target.name })
  }

  componentDidMount () {
    $('.ui.dropdown').dropdown()
  }

  componentWillUnmount () {
     $('.ui.dropdown').dropdown()
  }
  

  render() {
    const { activeItem } = this.state

    return (
      <div className="ui inverted stackable menu">
        <div className="ui container">
          <Link to="/" className={'item ' + (activeItem === 'home' ? 'active' : '')} name="home" onClick={this.handleItemClick}>
            Home
          </Link>
          <Link to="/test" className={'item ' + (activeItem === 'message' ? 'active' : '')} name="message" onClick={this.handleItemClick}>
            Messages
          </Link>
          <div className="right menu">
            <div className="ui dropdown item">
              Language <i className="dropdown icon"></i>
              <div className="menu">
                <a className="item">English</a>
                <a className="item">Russian</a>
                <a className="item">Spanish</a>
              </div>
            </div>
            <div className="item">
              <div className="ui primary button">Sign Up</div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}