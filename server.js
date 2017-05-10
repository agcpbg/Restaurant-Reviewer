'use strict';

const express = require('express');
const volleyball = require('volleyball');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const models = require('./db');
const path = require('path');

const app = express();

app.use(volleyball);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.resolve(__dirname, 'public')));


app.get('/api/cities', function (req, res, next) {
  models.City.findAll()
  .then(cities => {
    res.json(cities);
  })
  .catch(next);
});

app.post('/api/city', function (req, res, next) {
  models.City.create(req.body)
  .then(city => {
    res.json(city);
  })
  .catch(next);
});

app.get('/api/city/:id', function (req, res, next) {
  models.City.findOne({
    include: [models.Restaurant],
    where: { id: req.params.id }
  })
  .then(city => {
    res.json(city);
  })
  .catch(next);
});

app.get('/api/restaurant/:id', function (req, res, next) {
  console.log('req.params on server', req.params);
  models.Restaurant.findOne({
    where: { id: req.params.id }
  })
  .then(restaurant => {
    res.json(restaurant);
  })
  .catch(next);
});

app.post('/api/restaurant', function (req, res, next) {
  models.Restaurant.create(req.body)
  .then(restaurant => {
    res.json(restaurant);
  })
  .catch(next);
});

app.put('/api/restaurant', function (req, res, next) {
  models.Restaurant.update({
    name: req.body.name,
    rating: req.body.rating,
    review: req.body.review
  }, {
    where: { id: req.body.id },
    returning: true
  })
  .then(restaurant => {
    res.json(restaurant[1][0]);
  })
  .catch(next);
});

app.delete('/api/restaurant/:id', function (req, res, next) {
  models.Restaurant.destroy({
    where: { id: req.params.id },
    force: true
  })
  .then(restaurant => {
    res.json(restaurant);
  })
  .catch(next);
});

app.delete('/api/city/:id', function (req, res, next) {
  models.Restaurant.destroy({
    where: { cityId: req.params.id}
  })
  .then(() => {
    return models.City.destroy({
      where: { id: req.params.id },
      force: true
    });
  })
  .then(city => {
    res.json(city);
  })
  .catch(next);
});

app.get('/*', function (req, res, next) {
  res.sendFile(path.resolve(__dirname, 'index.html'));
});

// force: true
models.City.sync({  })
  .then(function() {
    return models.Restaurant.sync({  });
  })
  .then(function() {
    app.listen(3000, function() {
      console.log('Server is listening on port 3000');
    });
  })
  .catch(console.error);

