"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketBuyingHistory = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const User_1 = require("./User");
const Event_1 = require("./Event");
const TicketBuyingHistorySchema = new mongoose_1.default.Schema({
    event: {
        type: Event_1.EventSchema,
        ref: 'Event',
        required: true
    },
    user: {
        type: User_1.UserSchema,
        ref: 'User',
        required: true
    },
    place_count: { type: Number, required: false },
    purchased_ticket_type: { type: String, required: true }
});
exports.TicketBuyingHistory = mongoose_1.default.model('TicketBuyingHistory', TicketBuyingHistorySchema);
