'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Book Schema
 */
var BookSchema = new Schema({
    titre : {
        type: String,
        default: '',
                 trim: true,
    },
    auteur: {
        type: String,
        default: '',
                 trim: true
    },
    maison : {
        type: String,
        default: '',
                 trim: true
    },
    page : {
        type : Number,
    },
    annee : {
        type : Number,
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    }
});

mongoose.model('Book', BookSchema);
