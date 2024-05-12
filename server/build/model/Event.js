"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Event = exports.EventSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const User_1 = require("./User");
exports.EventSchema = new mongoose_1.default.Schema({
    creator: {
        type: User_1.UserSchema,
        ref: 'User',
        required: true
    },
    title: { type: String, required: true },
    startdate: { type: Date, required: true },
    finishdate: { type: Date, required: true },
    location: { type: String, required: true },
    place_count: { type: Number, required: false },
    general_ticket_price: { type: Number, required: true },
    VIP_ticket_price: { type: Number, required: false },
    priority_ticket_price: { type: Number, required: false },
    student_ticket_price: { type: Number, required: false },
    child_ticket_price: { type: Number, required: false },
    retired_ticket_price: { type: Number, required: false },
    image: { type: String, required: false }
});
exports.Event = mongoose_1.default.model('Event', exports.EventSchema);
