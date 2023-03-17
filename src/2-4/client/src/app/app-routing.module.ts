import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthLayoutComponent } from './shared/layouts/auth-layout/auth-layout.component';
import { LoginLayoutComponent } from './shared/layouts/login-layout/login-layout.component';
import { RegLayoutComponent } from './shared/layouts/reg-layout/reg-layout.component';
import { SiteLayoutComponent } from './shared/layouts/site-layout/site-layout.component';
import { TodoLayoutComponent } from './shared/layouts/todo-layout/todo-layout.component';

const routes: Routes = [
  {
    path: '', component: AuthLayoutComponent, children: [
      { path: '', redirectTo: '/login', pathMatch: 'full' },
      { path: 'login', component: LoginLayoutComponent },
      { path: 'registration', component: RegLayoutComponent }
    ]
  },
  {
    path: '', component: SiteLayoutComponent, children: [
      { path: 'todo', component: TodoLayoutComponent },

    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
