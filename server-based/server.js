var express = require('express');
var path = require('path');
var mustache = require('mustache');
var fs = require('fs');
var bodyParser = require('body-parser');
var app = express();
var tasks = [
  {
    name: 'Task 1'
  }
];
var newTask;

app.use(bodyParser());

function renderIndex(response) {
  var template = fs.readFileSync(path.join(__dirname, 'public', 'index.html'), {encoding: 'utf-8'});
  response.send(mustache.render(template, {tasks: tasks, newTask: newTask}));
}

app.get('/', function (request, response) {
  renderIndex(response);
  newTask = false;
});

app.post('/', function (request, response) {
  newTask = true;
  tasks.push({name: request.body.task});

  response.status(200);
  renderIndex(response);
});

app.listen(5446, function () {
  console.log('server running');
});