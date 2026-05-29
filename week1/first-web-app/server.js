const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('<h1>My web app<h1>');
});

app.get('/hello', (req, res) => {
  res.json({hello: 'world'});
});

app.post('/books', (req, res) => {
  res.status(201).send('Success!');
});

module.exports = app;
