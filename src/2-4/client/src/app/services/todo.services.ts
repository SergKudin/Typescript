import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http"
import { Todo } from "../shared/interfaces";
import { catchError, Observable, tap, throwError } from "rxjs";
import { ErrorService } from "./error.service";
import { ITodo } from "../models/todo";

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  constructor(
    private http: HttpClient,
    private errorService: ErrorService
  ) { }

  private errorHandler(e: HttpErrorResponse) {
    this.errorService.handle(e.message);
    return throwError(() => e.message);
  }

  todos: ITodo[] = [];

  updateTodo(): void {
    this.getAll().subscribe();
  }

  getAll(): Observable<{ items: ITodo[] }> {
    return this.http.post<{ items: ITodo[] }>('/api/v2/router?action=getItems', null).pipe(
      tap(todos => {
        this.todos = todos.items;
        console.log(this.todos);
      }),
      catchError(this.errorHandler.bind(this)
      )
    );
  }

  deleteTodo(idTodo: string): Observable<{ ok: string }> {
    return this.http.post<{ ok: string }>('/api/v2/router?action=deleteItem', { id: idTodo }).pipe(
      catchError(this.errorHandler.bind(this))
    );
  }

  addTodo(text: string): Observable<{ id: string }> {
    return this.http.post<{ id: string }>('/api/v2/router?action=addItem', { text: text }).pipe(
      catchError(this.errorHandler.bind(this))
    );
  }

  editTodo(todo: ITodo): Observable<{ ok: string }> {
    return this.http.post<{ ok: string }>('/api/v2/router?action=editItem', todo).pipe(
      catchError(this.errorHandler.bind(this))
    );
  }
}