
/**
 * Module dependencies.
 */

var express = require('express')
  , http = require('http')
  , path = require('path');

var app = express();
app.set('view engine', 'ejs');
app.use("/", express.static("."));
// app.configure(function(){ 
//     app.set('port', process.env.PORT || 3000);
    
     //app.engine('.html', require('ejs').renderFile());
//     app.use(express.favicon());
//     app.use(express.logger('dev'));
//     app.use(express.bodyParser());
//     app.use(express.methodOverride());
//     app.use(app.router);
//     app.use(express.static(path.join(__dirname, 'public')));
//     // development only
//     if ('development' == app.get('env')) {
//         app.use(express.errorHandler());
//     }
// });

app.get('/', function(req, res){
  res.render('index.html');
}); 

var port = 5500;
var server = app.listen(port, function(){
  console.log("Express server listening on port " + port);
});
