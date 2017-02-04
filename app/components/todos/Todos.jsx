import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'

@inject('fireStore') @observer
class Todos extends Component {
  render() {
    let todos = this.props.fireStore.todos.map((todo) => {
      let finishedClass = todo.finished ? 'check square' : 'minus circle'
      let toggleClass = !todo.finished ? 'check square' : 'minus circle'
      let finishStyle = {color: todo.finished ? 'blue' : 'red'}
      let toogleStyle = {color: !todo.finished ? 'blue' : 'red'}

      return (
        <div className="item" key={todo._id}>
          <div className="right floated content">
            <button className="circular ui basic icon button"> <i className="remove icon" style={styles.remove}></i> </button>
            <button className="circular ui basic icon button"> <i className="edit icon" style={styles.edit}></i> </button>
            <button className="circular ui basic icon button"> <i className={toggleClass + " icon"} style={toogleStyle}></i> </button>
          </div>
          <i className={"large middle aligned icon " + finishedClass} style={finishStyle}></i>
          <div className="content">
            <a className="header">{todo.title}</a>
            <div className="description">{todo.description}</div>
          </div>
        </div>
      )
    })

    return (
      <div className="ui relaxed divided list">
        {todos}
      </div>
    )
  }
}

export default Todos

let styles = {
  edit: {
    color: 'blue'
  },
  remove: {
    color: 'red'
  }
}