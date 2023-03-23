import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, tap, throwError } from "rxjs";
import { User } from "../shared/interfaces";
import { ErrorService } from "./error.service";

@Injectable({
  providedIn: 'root'
})
export class AuphServices {

  user: string;

  constructor(
    private http: HttpClient,
    private errorService: ErrorService
  ) { }

  private errorHandler(e: HttpErrorResponse) {
    this.errorService.handle(e.message);
    return throwError(() => e.message);
  }

  login(logUser: User): Observable<{ ok: string }> {
    return this.http.post<{ ok: string }>('/api/v2/router?action=login', logUser).pipe(
      tap(() => { this.user = logUser.login }),
      catchError(this.errorHandler.bind(this))
    );
  }

  register(regUser: User): Observable<{ ok: string }> {
    return this.http.post<{ ok: string }>('/api/v2/router?action=register', regUser).pipe(
      tap(() => { this.user = regUser.login }),
      catchError(this.errorHandler.bind(this))
    );
  }

  logout(): Observable<{ ok: string }> {
    return this.http.post<{ ok: string }>('/api/v2/router?action=logout', null).pipe(
      tap(() => { this.user = '' }),
      catchError(this.errorHandler.bind(this))
    );
  }
}