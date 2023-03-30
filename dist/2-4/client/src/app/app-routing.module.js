"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppRoutingModule = void 0;
const core_1 = require("@angular/core");
const router_1 = require("@angular/router");
const auth_layout_component_1 = require("./shared/layouts/auth-layout/auth-layout.component");
const login_layout_component_1 = require("./shared/layouts/login-layout/login-layout.component");
const reg_layout_component_1 = require("./shared/layouts/reg-layout/reg-layout.component");
const site_layout_component_1 = require("./shared/layouts/site-layout/site-layout.component");
const todo_layout_component_1 = require("./shared/layouts/todo-layout/todo-layout.component");
const routes = [
    {
        path: '', component: auth_layout_component_1.AuthLayoutComponent, children: [
            { path: '', redirectTo: '/login', pathMatch: 'full' },
            { path: 'login', component: login_layout_component_1.LoginLayoutComponent },
            { path: 'registration', component: reg_layout_component_1.RegLayoutComponent }
        ]
    },
    {
        path: '', component: site_layout_component_1.SiteLayoutComponent, children: [
            { path: 'todo', component: todo_layout_component_1.TodoLayoutComponent },
        ]
    }
];
let AppRoutingModule = class AppRoutingModule {
};
AppRoutingModule = __decorate([
    (0, core_1.NgModule)({
        imports: [router_1.RouterModule.forRoot(routes)],
        exports: [router_1.RouterModule]
    })
], AppRoutingModule);
exports.AppRoutingModule = AppRoutingModule;
//# sourceMappingURL=app-routing.module.js.map