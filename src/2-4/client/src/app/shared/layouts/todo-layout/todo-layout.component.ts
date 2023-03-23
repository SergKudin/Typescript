import { Component, OnInit } from '@angular/core';
import { ITodo } from 'src/app/models/todo';
import { AddTodoService } from 'src/app/services/add-todo.service';
import { AuphServices } from 'src/app/services/auth.services';
import { EditTodoService } from 'src/app/services/edit-todo.service';
import { TodoService } from 'src/app/services/todo.services';

@Component({
  selector: 'app-todo-layout',
  templateUrl: './todo-layout.component.html',
})
export class TodoLayoutComponent implements OnInit {
  // todos: ITodo[] = [];
  loading = false;
  index: number;
  user: string;

  constructor(
    public todosService: TodoService,
    public addTodoService: AddTodoService,
    public editTodoService: EditTodoService,
    public auphServices: AuphServices
  ) { }

  ngOnInit(): void {
    this.loading = true;

    this.todosService.getAll().subscribe({
      // () => {
      //   // this.todos = todo.items;
      //   // this.user = todo.items[0].user;
      //   this.loading = false;
      // },
      error: (e) => {
        console.error(e);
        alert(e.error.error);
      },
      complete: () => {
        this.loading = false;
      }
    }
    );
  }


}
