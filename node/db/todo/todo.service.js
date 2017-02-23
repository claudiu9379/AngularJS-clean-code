const storage = require('../storage/storage');

class TodoService {
    constructor() {
        console.log("ctor todo service");

    }

    * addTodo(todoItem) {
        todoItem.addedDate = new Date();
        let response = yield storage.todo.insert(todoItem);
        return response;
    }

     * getTodos() {
        let response = yield storage.todo.find({}).toArray();
        return response;
    }
}

module.exports = new TodoService();
