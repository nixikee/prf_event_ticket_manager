import mongoose, { Document, Model, Schema, SchemaTypes } from "mongoose";
import { EventSchema, IEvent } from "./Event";

interface ITicketSales extends Document {
    event: mongoose.Types.ObjectId | IEvent;
    place_count?: number;
    sold_general_ticket: number;
    sold_VIP_ticket: number;
    sold_priority_ticket: number;
    sold_student_ticket: number;
    sold_child_ticket: number;
    sold_retired_ticket: number;
}

const TicketSalesSchema: Schema<ITicketSales> = new mongoose.Schema({ 
    event: {
        type: EventSchema,
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

export const TicketSales: Model<ITicketSales> = mongoose.model<ITicketSales>('TicketSales', TicketSalesSchema);