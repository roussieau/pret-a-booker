'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Book = mongoose.model('Book'),
  Critique = mongoose.model('Critique'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create an book
 */
exports.create = function (req, res) {
  var book = new Book(req.body);
  book.user = req.user;

  book.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(book);
    }
  });
};

/**
 * Show the current book
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var book = req.book ? req.book.toJSON() : {};
    Critique.find({'book' : book._id}).populate('user').exec( function(err, crit){
	var num = 0;
	var div = 0;
	crit.forEach(function(el){
	    num += el.note;
	    div ++;
	});
	book.avg = num/div;
	book.critique = crit;
	console.log(book);
      res.json(book);
  });

};

/**
 * Delete an book
 */
exports.delete = function (req, res) {
  var book = req.book;

  book.remove(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(book);
    }
  });
};

/**
 * List of Books
 */
exports.list = function (req, res) {
  Book.find().populate('user', 'displayName').exec(function (err, books) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(books);
    }
  });
};

/**
 * Book middleware
 */
exports.bookByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Book is invalid'
    });
  }

  Book.findById(id).populate('user', 'displayName').exec(function (err, book) {
    if (err) {
      return next(err);
    } else if (!book) {
      return res.status(404).send({
        message: 'No book with that identifier has been found'
      });
    }
    req.book = book;
    next();
  });
};
