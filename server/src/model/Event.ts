import mongoose, { Document, Model, Schema } from "mongoose";
import { IUser, UserSchema } from './User';

export interface IEvent extends Document {
    creator: IUser | Schema.Types.ObjectId; // ref user-re
    title: string;
    startdate: Date;
    finishdate: Date;
    location: string;
    place_count: number;
    general_ticket_price: number;
    VIP_ticket_price?: number;
    priority_ticket_price?: number;
    student_ticket_price?: number;
    child_ticket_price?: number;
    retired_ticket_price?: number;
    image?: string;
}

export const EventSchema: Schema<IEvent> = new mongoose.Schema({
    creator: {
        type: UserSchema,
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

export const Event: Model<IEvent> = mongoose.model<IEvent>('Event', EventSchema);