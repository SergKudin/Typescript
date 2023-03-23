import { Component, OnInit } from '@angular/core';
import { todo } from 'src/app/data/todo';
import { ITodo } from 'src/app/models/todo';
import { TodoService } from 'src/app/shared/services/todo.services';

@Component({
  selector: 'app-todo-layout',
  templateUrl: './todo-layout.component.html',
})
export class TodoLayoutComponent implements OnInit {
  title = 'client';
  // todos: ITodo[] = [];
  loading = false;
  todos: ITodo[] = todo;
  index: number;

  constructor(private todosService: TodoService) { }

  ngOnInit(): void {
    this.loading = true;
    // this.todosService.userLogin().subscribe(out => {
    //   console.log(out);
    //   this.loading = false;
    // });
    this.todosService.getAll().subscribe(todo => {
      console.log(todo);
      // this.todos = todo;
      this.loading = false;
    });
  }


}
