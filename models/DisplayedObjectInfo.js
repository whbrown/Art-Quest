'use strict';

const mongoose = require('mongoose');

const { Schema } = mongoose;

const displayedObjectInfoSchema = new Schema({
  objectId: Number,
  location: String,
  description: String
});

const DisplayedObjectInfo = mongoose.model(
  'Displayed-Object-Information',
  displayedObjectInfoSchema
);

module.exports = DisplayedObjectInfo;