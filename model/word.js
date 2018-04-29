'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const wordSchema = new Schema({
    "word": { type: String, index: { unique: true, dropDups: true } },
    "level": { type: String },
    "pronunciations": [{ type: String }],
    "chineseExplanations": [{
        "pos": { type: String },
        "explanation": { type: String }
    }],
    "explanations": [{
        "pos": { type: String },
        "explanation": { type: String }
    }],
    "sentences": [{
        "content": { type: String },
        "url": { type: String }
    }],
    "created": { type: Date, default: Date.now, index: true },
    "updated": { type: Date, default: Date.now, index: true },
});

wordSchema.pre('save', function (next) {
    this.updated = Date.now();
    next();
});

const Word = mongoose.model('Word', wordSchema);

module.exports = Word;