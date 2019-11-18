'use strict';

const mongoose = require('mongoose');

const { Schema } = mongoose;

const objectSchema = new Schema({
  'Object Number': {
    type: String,
    required: true,
  },
  'Is Highlight': String,
  'Is Public Domain': String,
  'Object ID': {
    type: String,
    required: true,
  },
  Department: String,
  'Object Name': String,
  Title: String,
  Culture: String,
  Period: String,
  Dynasty: String,
  Reign: String,
  Portfolio: String,
  'Artist Role': String,
  'Artist Prefix': String,
  'Artist Display Name': String,
  'Artist Display Bio': String,
  'Artist Suffix': String,
  'Artist Alpha Sort': String,
  'Artist Nationality': String,
  'Artist Begin Date': String,
  'Artist End Date': String,
  'Object Date': String, // can't use { type: Date } due to issues with this field using date ranges (e.g. 1852-58),
  // or approximations (e.g. ca. 1800), will require regex to parse if used as a relevant field for weighing preferences.
  'Object Begin Date': String,
  'Object End Date': String,
  Medium: String,
  Dimensions: String,
  'Credit Line': String,
  'Geography Type': String,
  City: String,
  State: String,
  County: String,
  Country: String,
  Region: String,
  Subregion: String,
  Locale: String,
  Locus: String,
  Excavation: String,
  River: String,
  Classification: String,
  'Rights and Reproduction': String,
  'Link Resource': 'String',
  'Metadata Date': Date,
  Repository: String,
  Tags: String,
});

const Object = mongoose.model('Full-collection', objectSchema);
module.exports = Object;
