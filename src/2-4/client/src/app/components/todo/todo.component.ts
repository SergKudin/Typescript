import { Component, Input } from '@angular/core';
import { todo } from 'src/app/data/todo';
import { todos } from 'src/app/data/todos';
import { ITodo } from 'src/app/models/todo';
import { ITodos } from 'src/app/models/todos';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
})
export class AppTodo {
  title = 'todo';

  @Input() todo: ITodo;
  @Input() index: number;

  check = false;

}
