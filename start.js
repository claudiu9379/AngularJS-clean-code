/**
 * Module dependencies.
 */

var express = require('express'),
    http = require('http'),
    path = require('path');

var app = express();
app.set('view engine', 'ejs');
app.use("/", express.static("."));

const koaApp = require('koa')();
const koaRouter = require('koa-router')();
const parse = require('co-body');
const coaCors = require('koa-cors');
const co = require('co');
const storage = require('./node/db/storage/storage');
const todoService = require("./node/db/todo/todo.service"); 



app.get('/', function(req, res) {
    res.render('index.html');
});


koaApp.use(function *(next) {
    this.set('Access-Control-Allow-Origin', '*');
    this.state = this.state || {};
    this.state.body = yield parse.json(this);
    yield next;
});

co(function* getResults() {
    console.log('starting todo db');
    yield storage.initialize("mongodb://127.0.0.1/tododb");
});

koaApp.use(coaCors());

koaRouter
    .post('/addTodo', function*() {
        console.log("addTodo");
        let response = yield todoService.addTodo(this.state.body);
        //add to database
        this.body = response
    })
    .post('/getTodo', function*() {
        let response = yield todoService.getTodos(this.state.body);
        //add to database
        this.body = response;
    });

koaApp.use(koaRouter.routes())
    .use(koaRouter.allowedMethods());
koaApp.listen(5501);

var port = 5500;
var server = app.listen(port, function() {
    console.log("Express server listening on port " + port);
});
