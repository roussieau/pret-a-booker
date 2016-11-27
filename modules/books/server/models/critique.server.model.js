'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Critique Schema
 */
var CritiqueSchema = new Schema({
  title: {
    type: String,
    default: '',
    trim: true
  },
  avis: {
    type: String,
    default: ''
  },
  note: {
    type: Number,
    min: 0,
    max: 5
  },
  date: {
    type: Date,
    default: Date.now()
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  book: {
    type: Schema.ObjectId,
    ref: 'Book'
  }
});

mongoose.model('Critique', CritiqueSchema);
