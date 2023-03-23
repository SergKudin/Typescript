import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ITodo } from 'src/app/models/todo';
import { EditTodoService } from 'src/app/services/edit-todo.service';
import { TodoService } from 'src/app/services/todo.services';

@Component({
  selector: 'app-edit-text-todo',
  templateUrl: './edit-text-todo.component.html'
})
export class EditTextTodoComponent {
  @Input() todo: ITodo;

  constructor(
    private todoService: TodoService,
    public editTodoService: EditTodoService
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
    let text = this.form.value.title
    console.log(this.title);
    console.log(text);
    console.log(JSON.stringify(this.todo));

    const { id, checked, user } = this.todo;
    if (text) {
      this.todoService.editTodo({ text, id, checked, user }).subscribe({
        error: (e) => {
          console.error(e);
          alert(e.error.error);
        },
        complete: () => {
          this.todoService.updateTodo();
          this.editTodoService.close();
        }
      })
    }
  };
}
