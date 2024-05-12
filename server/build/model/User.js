"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.UserSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const SALT_FACTOR = 10;
exports.UserSchema = new mongoose_1.default.Schema({
    email: { type: String, required: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    nickname: { type: String, required: false },
    birthdate: { type: Date, required: true },
    address: { type: String, required: false },
    phonenumber: { type: String, required: false },
    role: { type: String, required: true },
    password: { type: String, required: true }
});
exports.UserSchema.pre('save', function (next) {
    const user = this;
    bcrypt_1.default.genSalt(SALT_FACTOR, (error, salt) => {
        if (error) {
            return next(error);
        }
        bcrypt_1.default.hash(user.password, salt, (err, encrypted) => {
            if (err) {
                return next(err);
            }
            user.password = encrypted;
            next();
        });
    });
});
exports.UserSchema.methods.comparePassword = function (candidatePassword, callback) {
    const user = this;
    bcrypt_1.default.compare(candidatePassword, user.password, (error, isMatch) => {
        if (error) {
            callback(error, false);
        }
        callback(null, isMatch);
    });
};
exports.User = mongoose_1.default.model('User', exports.UserSchema);
