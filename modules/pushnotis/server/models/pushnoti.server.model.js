'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Pushnoti Schema
 */
var PushnotiSchema = new Schema({
  user_id: {
    type: String,
    required: 'Please fill Pushnoti user id',
    trim: true
  },
  user_name: {
    type: String,
    trim: true
  },
  role: {
    type: String,
    required: 'Please fill Pushnoti role',
    trim: true
  },
  device_token: {
    type: String,
    required: 'Please fill Pushnoti device token',
    trim: true
  },
  created: {
    type: Date,
    default: Date.now
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('Pushnoti', PushnotiSchema);
