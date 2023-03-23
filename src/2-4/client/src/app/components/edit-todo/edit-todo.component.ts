import { Component, Input } from '@angular/core';
import { ITodo } from 'src/app/models/todo';
import { EditTodoService } from 'src/app/services/edit-todo.service';

@Component({
  selector: 'app-edit-todo',
  templateUrl: './edit-todo.component.html',
})
export class EditTodoComponent {
  @Input() index: number;

  constructor(
    public editTodoService: EditTodoService
  ) { }
}
