import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'

@inject('fireStore')
class Todo extends Component {

  constructor(props) {
    super(props)
    this.store = this.props.fireStore
  }

  toggleFinished(todo) {
    this.store.toggleFinished(todo)
  }

  removeTodo(todo) {
    this.store.remove(todo)
  }

  render() {
    let {todo} = this.props

    let finishedClass = todo.finished ? 'check square' : 'minus circle'
    let toggleClass = !todo.finished ? 'check square' : 'minus circle'
    let finishStyle = { color: todo.finished ? 'blue' : 'red' }
    let toggleStyle = { color: !todo.finished ? 'blue' : 'red' }


    return (
      <div className="item">
        <div className="right floated content">
          <button className="circular ui basic icon button" onClick={this.removeTodo.bind(this, todo)}> <i className="remove icon" style={styles.remove}></i> </button>
          <button className="circular ui basic icon button"> <i className="edit icon" style={styles.edit}></i> </button>
          <button className="circular ui basic icon button" onClick={this.toggleFinished.bind(this, todo)}> <i className={toggleClass + " icon"} style={toggleStyle}></i> </button>
        </div>
        <i className={"large middle aligned icon " + finishedClass} style={finishStyle}></i>
        <div className="content">
          <a className="header">{todo.title}</a>
          <div className="description">{todo.description}</div>
        </div>
      </div>
    )
  }
}

export default Todo

let styles = {
  edit: {
    color: 'blue'
  },
  remove: {
    color: 'red'
  }
}