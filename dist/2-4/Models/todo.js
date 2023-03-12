export default class Todo {
    constructor(user, text, checked = false, id, _id) {
        this.user = user;
        this.text = text;
        this.checked = checked;
        this.id = id;
        this._id = _id;
    }
}
export class dataTodo {
    constructor(user, todos) {
        this.user = user;
        this.todos = todos;
    }
}
//# sourceMappingURL=todo.js.map