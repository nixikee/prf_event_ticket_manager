import mongoose, { Document, Model, Schema } from "mongoose";
import bcrypt from 'bcrypt';

const SALT_FACTOR = 10;

export interface IUser extends Document {
    email: string;
    firstname: string;
    lastname: string;
    nickname?: string;
    birthdate: Date;
    address?: string;
    phonenumber?: string;
    role: string;
    password: string;
    comparePassword: (candidatePassword: string, callback: (error: Error | null, isMatch: boolean) => void) => void;
}

export const UserSchema: Schema<IUser> = new mongoose.Schema({
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

UserSchema.pre<IUser>('save', function(next) {
    const user = this;

    bcrypt.genSalt(SALT_FACTOR, (error, salt) => {
        if (error) {
            return next(error);
        }
        bcrypt.hash(user.password, salt, (err, encrypted) => {
            if (err) {
                return next(err);
            }
            user.password = encrypted;
            next();
        });
    });
});

UserSchema.methods.comparePassword = function(candidatePassword: string, callback: (error: Error | null, isMatch: boolean) => void): void {
    const user = this;

    bcrypt.compare(candidatePassword, user.password, (error, isMatch) => {
        if (error) {
            callback(error, false);
        }
        callback(null, isMatch);
    });
}

export const User: Model<IUser> = mongoose.model<IUser>('User', UserSchema);
