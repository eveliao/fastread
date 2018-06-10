'use strict';

const crypto = require('crypto');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    "username": { type: String, index: { unique: true, sparse: true} },
    "password": { type: String },
    "books": [{
        book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' },
        segment: { type: mongoose.Schema.Types.ObjectId, ref: 'Segment' }
    }],
    "records": [{
        book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' },
        segment: { type: mongoose.Schema.Types.ObjectId, ref: 'Segment' },
        score: { type: Number },
        time: { type: Number }
    }],
    "words": [{
        word: { type: mongoose.Schema.Types.ObjectId, ref: 'Word' },
        times: { type: Number }
    }],
    "level": { type: Number },
    "nickname": { type: String, default: "" },
    "wechatOpenId": { type: String, default: "" },
    "avatar": { type: String, default: "" },
    "age": { type: Number, default: 0 },
    "gender": { type: Number, default: 0 },
    "phone": { type: String, default: '' },
    "email": { type: String, default: '' },
    "created": { type: Date, default: Date.now, index: true },
    "updated": { type: Date, default: Date.now, index: true }
});

// use sha1 to crypt password
userSchema.path('password').set(function (v) {
    let shasum = crypto.createHash('sha1');
    shasum.update(v);
    return shasum.digest('hex');
});

userSchema.pre('save', function (next) {
    this.updated = Date.now();
    next();
});

userSchema.statics.findByUsername = function (username) {
    return this.findOne({ username: username });
};

const User = mongoose.model('User', userSchema);

module.exports = User;