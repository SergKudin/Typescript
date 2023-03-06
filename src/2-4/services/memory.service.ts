import Todo from "../Models/todo.js";
import User from "../Models/user.js";
import { dataTodo } from "../Models/todo.js";

// functions for working with the Memory
export default class dbInMemory {

  static usersData: User[] = [];
  static todosData: dataTodo[] = [];
  static todosID = 0;

  static async findOneUserMemory(login: string) {
    return this.usersData.find(item => item.autUser === login);
  }

  static async insertOneUserMemory(login: string, pass: string) {
    return this.usersData.push({ autUser: login, autPass: pass });
  }

  static async getAllTodosMemory(user: string) {
    return this.todosData.find(item => item.user === user)?.todos ?? [];
  }

  static async findOneTodoMemory(user: string, todo: string) {
    return this.todosData.find(item => item.user === user)?.todos.find(item => item.text === todo);
  }

  static async insertOneTodoMemory(todo: Todo) {
    const user: string = todo.user;
    this.todosID += 1;
    todo.id = `${this.todosID}`;
    const todos = this.todosData.find(itemUser => itemUser.user === user)?.todos;
    if (todos) {
      this.todosData.map(itemUser => {
        if (itemUser.user === user) {
          itemUser.todos.push(todo);
        }
      });
    } else {
      const todos: Todo[] = [todo];
      this.todosData.push({
        user: user,
        todos: todos,
      })
    }
    return { insertedId: todo.id };
  }

  static async updateOneTodoMemory(user: string, todo: Todo) {
    todo.user = user;
    const id = todo.id;
    if (id) {
      const todos = this.todosData.find(itemUser => itemUser.user === user)?.todos;
      const numTodos = this.todosData.findIndex(itemUser => itemUser.user === user);
      const numTodo = todos?.findIndex(itemTodo => itemTodo.id === id);
      const newtodos = ((numTodo === -1) || (numTodo === undefined) || (todos === undefined)) ?
        null : todos.splice(numTodo, 1, todo);
      if (newtodos && numTodos) {
        this.todosData.splice(numTodos, 1, { user: user, todos: newtodos });
      }
      return { insertedId: id };
    }
    return new Error('no found todo');;
  }

  static async deleteOneTodoMemory(user: string, todoID: string) {
    let deletedCount = 0;
    const todos = this.todosData.find(itemUser => itemUser.user === user)?.todos ?? [];
    const numTodos = this.todosData.findIndex(itemUser => itemUser.user === user);
    const numTodo = todos?.findIndex(itemTodo => itemTodo.id === todoID);
    const newtodos = ((numTodo === -1) || (numTodo === undefined)) ?
      null : todos.splice(numTodo, 1);
    if (newtodos) {
      deletedCount += 1;
      this.todosData.splice(numTodos, 1, { user: user, todos: todos });
    }
    return { insertedId: todoID, deletedCount: deletedCount };
  }

  static getUsers() {
    return this.usersData.slice();
  }

  static getTodos() {
    return this.todosData.slice();
  }

}

