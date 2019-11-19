'use strict';

const mongoose = require('mongoose');

const { Schema } = mongoose;

const objectSchema = new Schema({
  objectNumber: {
    type: String,
    required: true,
  },
  isHighlight: String,
  isPublicDomain: String,
  objectId: {
    type: String,
    required: true,
  },
  department: String,
  objectName: String,
  title: String,
  culture: String,
  period: String,
  dynasty: String,
  reign: String,
  portfolio: String,
  artistRole: String,
  artistPrefix: String,
  artistDisplayName: String,
  artistDisplayBio: String,
  artistSuffix: String,
  artistAlphaSort: String,
  artistNationality: String,
  artistBeginDate: String,
  artistEndDate: String,
  objectDate: String, // can't use { type: Date } due to issues with this field using date ranges (e.g. 1852-58),
  // or approximations (e.g. ca. 1800), will require regex to parse if used as a relevant field for weighing preferences.
  objectBeginDate: String,
  objectEndDate: String,
  medium: String,
  dimensions: String,
  creditLine: String,
  geographyType: String,
  city: String,
  state: String,
  county: String,
  country: String,
  region: String,
  subregion: String,
  locale: String,
  locus: String,
  excavation: String,
  river: String,
  classification: String,
  rightsAndReproduction: String,
  linkResource: 'String',
  metadataDate: Date,
  repository: String,
  tags: String,
  gallery: {
    type: String,
    default: '',
  },
  onDisplay: { type: Boolean, default: false },
});

const Object = mongoose.model('Full-collection', objectSchema);
module.exports = Object;
