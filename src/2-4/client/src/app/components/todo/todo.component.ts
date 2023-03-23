import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { todo } from 'src/app/data/todo';
import { todos } from 'src/app/data/todos';
import { ITodo } from 'src/app/models/todo';
import { ITodos } from 'src/app/models/todos';
import { EditTodoService } from 'src/app/services/edit-todo.service';
import { TodoService } from 'src/app/services/todo.services';
import { EditTextTodoComponent } from '../edit-text-todo/edit-text-todo.component';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
})
export class AppTodo implements OnDestroy {

  constructor(
    private router: Router,
    private todoService: TodoService,
    public editTodoService: EditTodoService,
    private editTextTodoComponent: EditTextTodoComponent
  ) { }

  @Input() index: number;
  @Input() todo: ITodo;

  aSub: Subscription;

  ngOnDestroy() {
    if (this.aSub) {
      this.aSub.unsubscribe();
    }
  }

  checkTodo(todo: ITodo) {
    todo.checked = !todo.checked;
    const { text, id, checked, user } = todo;
    this.todoService.editTodo({ text, id, checked, user })
      .subscribe({
        error: (e) => {
          console.error(e);
          alert(e.error.error);
        },
        complete: () => {
          this.todoService.updateTodo();
        }
      })
  }

  deleteTodo(todo: ITodo) {
    this.aSub = this.todoService.deleteTodo(todo.id).subscribe({
      error: (e) => {
        console.error(e);
        alert(e.error.error);
      },
      complete: () => {
        this.todoService.updateTodo();
      }
    })
  }

  editTodo(todo: ITodo) {
    this.editTodoService.open();
    let text: string;
    // this.editTextTodoComponent.getText().subscribe(
    //   {
    //     error: (e) => {
    //       console.error(e);
    //       alert(e.error.error);
    //     },
    //     next: (n) => {
    //       text = n;
    //     },
    //     complete: () => {

    //     }       
    //   }
    // );
    // this.editTodoService.close();

    // const { id, checked, user } = todo;
    // if (text) {
    //   this.todoService.editTodo({ text, id, checked, user }).subscribe({
    //     error: (e) => {
    //       console.error(e);
    //       alert(e.error.error);
    //     },
    //     complete: () => {
    //       this.todoService.updateTodo();
    //       this.editTodoService.close();
    //     }
    //   })
    // }
  };

}
