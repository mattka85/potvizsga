const Starwars = require('../models/starwars');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

module.exports = {
  list: (req, res) => {
    Starwars.find({})
        .then(starwars => res.json(starwars))
        .catch(err => res.send(err));
    //TODO: list spacehips
  },

  find: (req, res) => {
    Starwars.findById(req.params.id)
        .then(starwars => res.json(starwars))
        .catch(err => res.send(err));
    //TODO: find a spacehip
  },

  create: (req, res) => {
    Starwars.create(req.body)
        .then(starwars => res.send(starwars))
        .catch(err => res.send(err));
    //TODO: create spacehip
  },

  update: (req, res) => {
    Starwars.findByIdAndUpdate(req.params.id, req.body)
    .then(starwars => res.json(starwars))
    .catch(err => res.send(err));
    //TODO: update a spacehip
  },

  remove: (req, res) => {
    Starwars.findByIdAndRemove(req.params.id)
    .then(starwars => res.json(starwars))
    .catch(err => res.send(err));
    //TODO: delete spacehip
  },
};