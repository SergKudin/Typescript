export default class dbInMemory {
    static async findOneUserMemory(login) {
        return this.usersData.find(item => item.autUser === login);
    }
    static async insertOneUserMemory(login, pass) {
        return this.usersData.push({ autUser: login, autPass: pass });
    }
    static async getAllTodosMemory(user) {
        var _a, _b;
        return (_b = (_a = this.todosData.find(item => item.user === user)) === null || _a === void 0 ? void 0 : _a.todos) !== null && _b !== void 0 ? _b : [];
    }
    static async findOneTodoMemory(user, todo) {
        var _a;
        return (_a = this.todosData.find(item => item.user === user)) === null || _a === void 0 ? void 0 : _a.todos.find(item => item.text === todo);
    }
    static async insertOneTodoMemory(todo) {
        var _a;
        const user = todo.user;
        this.todosID += 1;
        todo.id = `${this.todosID}`;
        const todos = (_a = this.todosData.find(itemUser => itemUser.user === user)) === null || _a === void 0 ? void 0 : _a.todos;
        if (todos) {
            this.todosData.map(itemUser => {
                if (itemUser.user === user) {
                    itemUser.todos.push(todo);
                }
            });
        }
        else {
            const todos = [todo];
            this.todosData.push({
                user: user,
                todos: todos,
            });
        }
        return { insertedId: todo.id };
    }
    static async updateOneTodoMemory(user, todo) {
        var _a;
        todo.user = user;
        const id = todo.id;
        if (id) {
            const todos = (_a = this.todosData.find(itemUser => itemUser.user === user)) === null || _a === void 0 ? void 0 : _a.todos;
            const numTodos = this.todosData.findIndex(itemUser => itemUser.user === user);
            const numTodo = todos === null || todos === void 0 ? void 0 : todos.findIndex(itemTodo => itemTodo.id === id);
            const newtodos = ((numTodo === -1) || (numTodo === undefined) || (todos === undefined)) ?
                null : todos.splice(numTodo, 1, todo);
            if (newtodos && numTodos) {
                this.todosData.splice(numTodos, 1, { user: user, todos: newtodos });
            }
            return { insertedId: id };
        }
        return new Error('no found todo');
        ;
    }
    static async deleteOneTodoMemory(user, todoID) {
        var _a, _b;
        let deletedCount = 0;
        const todos = (_b = (_a = this.todosData.find(itemUser => itemUser.user === user)) === null || _a === void 0 ? void 0 : _a.todos) !== null && _b !== void 0 ? _b : [];
        const numTodos = this.todosData.findIndex(itemUser => itemUser.user === user);
        const numTodo = todos === null || todos === void 0 ? void 0 : todos.findIndex(itemTodo => itemTodo.id === todoID);
        const newtodos = ((numTodo === -1) || (numTodo === undefined)) ?
            null : todos.splice(numTodo, 1);
        if (newtodos) {
            deletedCount += 1;
            this.todosData.splice(numTodos, 1, { user: user, todos: todos });
        }
        return { insertedId: todoID, deletedCount: deletedCount };
    }
    static getUsers() {
        return this.usersData.slice();
    }
    static getTodos() {
        return this.todosData.slice();
    }
    static setUsersData(usersData) {
        this.usersData = usersData;
    }
    static setTodosData(todosData) {
        this.todosData = todosData;
    }
}
dbInMemory.usersData = [];
dbInMemory.todosData = [];
dbInMemory.todosID = 0;
//# sourceMappingURL=memory.service.js.map