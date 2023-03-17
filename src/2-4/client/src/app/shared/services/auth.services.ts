import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "../interfaces";

@Injectable({
  providedIn: 'root'
})
export class AuphServices {

  constructor(private http: HttpClient) { }

  login(logUser: User): Observable<{ ok: string }> {
    return this.http.post<{ ok: string }>('/api/v1/login', logUser);
  }

  register(regUser: User): Observable<{ ok: string }> {
    return this.http.post<{ ok: string }>('/api/v1/register', regUser);
  }
}