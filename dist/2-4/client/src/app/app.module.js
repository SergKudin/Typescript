"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const http_1 = require("@angular/common/http");
const core_1 = require("@angular/core");
const platform_browser_1 = require("@angular/platform-browser");
const forms_1 = require("@angular/forms");
const app_routing_module_1 = require("./app-routing.module");
const app_component_1 = require("./app.component");
const todo_component_1 = require("./components/todo/todo.component");
const auth_layout_component_1 = require("./shared/layouts/auth-layout/auth-layout.component");
const site_layout_component_1 = require("./shared/layouts/site-layout/site-layout.component");
const reg_layout_component_1 = require("./shared/layouts/reg-layout/reg-layout.component");
const login_layout_component_1 = require("./shared/layouts/login-layout/login-layout.component");
const todo_layout_component_1 = require("./shared/layouts/todo-layout/todo-layout.component");
const global_error_component_1 = require("./components/global-error/global-error.component");
const create_todo_component_1 = require("./components/create-todo/create-todo.component");
const focus_directive_1 = require("./directives/focus.directive");
const modal_component_1 = require("./components/modal/modal.component");
const edit_todo_component_1 = require("./components/edit-todo/edit-todo.component");
const edit_text_todo_component_1 = require("./components/edit-text-todo/edit-text-todo.component");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, core_1.NgModule)({
        declarations: [
            app_component_1.AppComponent,
            todo_component_1.AppTodo,
            auth_layout_component_1.AuthLayoutComponent,
            site_layout_component_1.SiteLayoutComponent,
            reg_layout_component_1.RegLayoutComponent,
            login_layout_component_1.LoginLayoutComponent,
            todo_layout_component_1.TodoLayoutComponent,
            global_error_component_1.GlobalErrorComponent,
            modal_component_1.ModalComponent,
            create_todo_component_1.CreateTodoComponent,
            focus_directive_1.FocusDirective,
            edit_todo_component_1.EditTodoComponent,
            edit_text_todo_component_1.EditTextTodoComponent
        ],
        imports: [
            platform_browser_1.BrowserModule,
            app_routing_module_1.AppRoutingModule,
            http_1.HttpClientModule,
            forms_1.FormsModule,
            forms_1.ReactiveFormsModule
        ],
        providers: [edit_text_todo_component_1.EditTextTodoComponent],
        bootstrap: [app_component_1.AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map