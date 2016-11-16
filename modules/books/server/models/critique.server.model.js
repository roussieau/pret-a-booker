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
  titre: {
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
  }
});

mongoose.model('Critique', CritiqueSchema);
