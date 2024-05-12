"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketSales = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Event_1 = require("./Event");
const TicketSalesSchema = new mongoose_1.default.Schema({
    event: {
        type: Event_1.EventSchema,
        ref: 'Event',
        required: true
    },
    place_count: { type: Number, required: false },
    sold_general_ticket: { type: Number, required: true },
    sold_VIP_ticket: { type: Number, required: true },
    sold_priority_ticket: { type: Number, required: true },
    sold_student_ticket: { type: Number, required: true },
    sold_child_ticket: { type: Number, required: true },
    sold_retired_ticket: { type: Number, required: true }
});
exports.TicketSales = mongoose_1.default.model('TicketSales', TicketSalesSchema);
