const mongoClient = require('mongodb').MongoClient;

class Storage {
    constructor() {
        console.log("ctor q");
        this.db = null;
        this.todo = null;

    }

    * initialize(connectionString) {
        if (!this.db) {
            this.db = yield mongoClient.connect(connectionString);
            this.todo = this.db.collection('todo');
	    
        }
    }
}

module.exports = new Storage();
