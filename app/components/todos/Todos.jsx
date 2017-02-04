import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import Todo from './Todo'

@inject('fireStore') @observer
class Todos extends Component {
  render() {
    let todos = this.props.fireStore.todos.map((todo) => {
      return(
        <Todo key={todo._id} todo={todo}></Todo>
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
