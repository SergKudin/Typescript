import { Component } from '@angular/core';
import { AddTodoService } from 'src/app/services/add-todo.service';

@Component({
  selector: 'app-add-todo',
  templateUrl: './modal.component.html',
})
export class ModalComponent {

  constructor(
    public addTodoService: AddTodoService
  ) { }
}
