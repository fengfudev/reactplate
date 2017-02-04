import { observable, computed, action } from 'mobx'
import {map, toJS} from 'mobx';
import secretConfig from "../secretConfig.js"
import firebase from 'firebase'

let app = firebase.initializeApp(secretConfig.firebase)
let db = app.database()
let auth = app.auth()
let baseRef = 'demo/'

let todos = db.ref(baseRef + 'todo')

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
    todos.on('value', (snapshot) => {
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

  add(name) {
    const id = todos.push().key
    this.update(id, name)
  };

  update(id, name) {
    todos.update({ [id]: { name } })
  };

  del(id) {
    todos.child(id).remove()
  };

}

export default new FireStore