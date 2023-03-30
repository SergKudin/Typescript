"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppTodo = void 0;
const core_1 = require("@angular/core");
let AppTodo = class AppTodo {
    constructor(router, todoService, editTodoService, editTextTodoComponent) {
        this.router = router;
        this.todoService = todoService;
        this.editTodoService = editTodoService;
        this.editTextTodoComponent = editTextTodoComponent;
    }
    ngOnDestroy() {
        if (this.aSub) {
            this.aSub.unsubscribe();
        }
    }
    checkTodo(todo) {
        todo.checked = !todo.checked;
        const { text, id, checked, user } = todo;
        this.todoService.editTodo({ text, id, checked, user })
            .subscribe({
            error: (e) => {
                console.error(e);
                alert(e.error.error);
            },
            complete: () => {
                this.todoService.updateTodo();
            }
        });
    }
    deleteTodo(todo) {
        this.aSub = this.todoService.deleteTodo(todo.id).subscribe({
            error: (e) => {
                console.error(e);
                alert(e.error.error);
            },
            complete: () => {
                this.todoService.updateTodo();
            }
        });
    }
    editTodo(todo) {
        this.editTodoService.open();
        let text;
    }
    ;
};
__decorate([
    (0, core_1.Input)()
], AppTodo.prototype, "index", void 0);
__decorate([
    (0, core_1.Input)()
], AppTodo.prototype, "todo", void 0);
AppTodo = __decorate([
    (0, core_1.Component)({
        selector: 'app-todo',
        templateUrl: './todo.component.html',
    })
], AppTodo);
exports.AppTodo = AppTodo;
//# sourceMappingURL=todo.component.js.map