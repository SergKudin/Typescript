import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AddTodoService } from 'src/app/services/add-todo.service';
import { TodoService } from 'src/app/services/todo.services';

@Component({
  selector: 'app-create-todo',
  templateUrl: './create-todo.component.html',
})
export class CreateTodoComponent {

  constructor(
    private todoService: TodoService,
    private addTodoService: AddTodoService
  ) { }

  form = new FormGroup({
    title: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(6)
    ])
  });

  get title() {
    return this.form.controls.title as FormControl
  }

  submit() {
    console.log(this.title);
    console.log(this.form.value.title);
    if (this.form.value.title) {
      this.todoService.addTodo(this.form.value.title).subscribe({
        error: (e) => {
          console.error(e);
          alert(e.error.error);
        },
        complete: () => {
          this.todoService.updateTodo();
          this.addTodoService.close();
        }
      })
    }
  };
}
