'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Critique = mongoose.model('Critique'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create an critique
 */
exports.create = function (req, res) {
  var critique = new Critique(req.body);
  critique.user = req.user;
  critique.book = req.params.bookId;
  console.log(critique);
  critique.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(critique);
    }
  });
};
