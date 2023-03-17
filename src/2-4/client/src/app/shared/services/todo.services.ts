import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http"
import { getReq, login, paramData, registr } from "../../data/parametrs.data";

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  constructor(private http: HttpClient) {
  }

  userReg() {
    return this.http.post(
      paramData.apiURL + paramData.apiVersion + registr.route + '?' + new URLSearchParams(registr.qs), registr.init);
  }

  userLogin() {
    return this.http.post(
      paramData.apiURL + paramData.apiVersion + login.route + '?' + new URLSearchParams(login.qs), login.init);
  }

  getAll() {
    return this.http.get(
      paramData.apiURL + paramData.apiVersion + getReq.route + '?' + new URLSearchParams(getReq.qs), getReq.init);
  }
}