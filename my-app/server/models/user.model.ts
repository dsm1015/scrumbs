import mongoose, { Document, Schema } from 'mongoose';

export interface IUser {
    username: string;
    role: string;
    token?: string;
}

export interface IUserModel extends IUser, Document {}

const UserSchema: Schema = new Schema(
    {
        username: { type: String, required: true},
        role: { type: String, required: true},
        token: { type: String, required: false}
    },
    {
        timestamps: true,
    }
);

export default mongoose.model<IUserModel>('User', UserSchema);