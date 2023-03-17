import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppTodo } from './components/todo/todo.component';
import { AuthLayoutComponent } from './shared/layouts/auth-layout/auth-layout.component';
import { SiteLayoutComponent } from './shared/layouts/site-layout/site-layout.component';
import { RegLayoutComponent } from './shared/layouts/reg-layout/reg-layout.component';
import { LoginLayoutComponent } from './shared/layouts/login-layout/login-layout.component';
import { TodoLayoutComponent } from './shared/layouts/todo-layout/todo-layout.component'
import { AuphServices } from './shared/services/auth.services';

@NgModule({
  declarations: [
    AppComponent,
    AppTodo,
    AuthLayoutComponent,
    SiteLayoutComponent,
    RegLayoutComponent,
    LoginLayoutComponent,
    TodoLayoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
