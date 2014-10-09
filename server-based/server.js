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

app.use(bodyParser());

function renderIndex(response, newTask) {
  var templatePath = path.join(__dirname, 'public', 'index.html');
  var template = fs.readFileSync(templatePath, {encoding: 'utf-8'});
  var renderedTemplate = mustache.render(template, {tasks: tasks, newTask: newTask});
  response.send(renderedTemplate);
}

app.get('/', function (request, response) {
  renderIndex(response, false);
});

app.post('/', function (request, response) {
  var newTask = {name: request.body.task};
  tasks.push(newTask);

  response.status(200);
  renderIndex(response, true);
});

app.listen(5446, function () {
  console.log('server running');
});