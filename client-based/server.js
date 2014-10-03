var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();
var tasks = [
  {
    name: 'Task 1'
  }
];

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser());

app.get('/tasks', function (request, response) {
  response.send(tasks);
});

app.post('/tasks', function (request, response) {
  var task = {name: request.body.name};
  tasks.push(task);
  response.status(200);
  response.send(task);
});

app.listen(5446, function () {
  console.log('server running');
});