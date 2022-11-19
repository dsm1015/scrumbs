import mongoose, { Document, Schema } from 'mongoose';

export interface ILog {
    timestamp: Date,
    level: string,
    message: string,
}

export interface ILogModel extends ILog, Document {}

const LogSchema: Schema = new Schema(
    {
        timestamp: { type: Date, required: true},
        level: { type: String, reuired: true},
        message: { type: String, required: true}
    },
    {
        timestamps: false
    }
);

export default mongoose.model<ILogModel>('Log', LogSchema);