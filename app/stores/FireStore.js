import { observable, computed, action } from 'mobx'
import {map, toJS} from 'mobx';
import secretConfig from "../secretConfig.js"
import firebase from 'firebase'

let app = firebase.initializeApp(secretConfig.firebase)
let db = app.database()
let auth = app.auth()
let baseRef = 'demo/'

let todosRef = db.ref(baseRef + 'todo')

function snapshotToArray(snapshot) {
  var result = [];
  snapshot.forEach(function (data) {
    let record = data.val()
    record['_id'] = data.key
    result.push(record)
  })
  return result
}

class FireStore {
  @observable todos = []
  @observable authUser = null

  constructor() {
    todosRef.on('value', (snapshot) => {
      this.todos = snapshotToArray(snapshot)
    });

    auth.onAuthStateChanged( user => {
      window.authUser = this.authUser = user
    })
  }

  @computed get json() {
    return toJS(this.todos)
  }

  @action setTodos(todos) {
    this.todos = todos
  }

  @action toggleFinished(todo) {
    return todosRef.child(todo._id).update({ finished: !todo.finished })
  }

  @action remove(todo) {
    return todosRef.child(todo._id).remove()
  }

  @action create(title, description, dueDate) {
    return todosRef.push({
      title,
      description,
      dueAt: dueDate ? new Date(dueDate).getTime() : null,
      createdAt: new Date().getTime(),
      finished: false
    });
  }

  @action update(todo) {
    return todosRef.child(todo._id).update({
      title: todo.title,
      description: todo.description,
      dueAt: (new Date(this.dueAt.time)).getTime()
    })
  }

}

export default new FireStore