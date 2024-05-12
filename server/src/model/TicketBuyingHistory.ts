import mongoose, { Document, Model, Schema, SchemaTypes } from "mongoose";
import { IUser, UserSchema } from "./User";
import { EventSchema, IEvent } from "./Event";

interface ITicketBuyingHistory extends Document { 
    event: mongoose.Types.ObjectId | IEvent;
    user: mongoose.Types.ObjectId | IUser;
    place_count?: number;
    purchased_ticket_type: string;
}

const TicketBuyingHistorySchema: Schema<ITicketBuyingHistory> = new mongoose.Schema({ 
    event: {
        type: EventSchema,
        ref: 'Event',
        required: true
    },
    user: {
        type: UserSchema,
        ref: 'User',
        required: true
    },
    place_count: { type: Number, required: false },
    purchased_ticket_type: { type: String, required: true }
});

export const TicketBuyingHistory: Model<ITicketBuyingHistory> = mongoose.model<ITicketBuyingHistory>('TicketBuyingHistory', TicketBuyingHistorySchema);