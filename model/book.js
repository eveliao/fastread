'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    "bookname": { type: String },
    "author": { type: String },
    "cover": { type: String },
    "segments": [{ type: mongoose.Schema.Types.ObjectId, ref: 'Segment' }],
    "level": { type: String },
    "downloads": { type: Number },
    "gutenburgId": { type: Number },
    "category": [{ type: String }]
});

bookSchema.pre('save', function (next) {
    this.updated = Date.now();
    next();
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;