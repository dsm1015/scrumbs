import mongoose, { Document, Schema } from 'mongoose';
import { IUser } from './user.model';

export interface ITeam {
    name: string;
    scrum_master: string;
    members: IUser[];
}

export interface ITeamModel extends ITeam, Document {}

const TeamSchema: Schema = new Schema(
    {
        name: { type: String, required: true, index: {unique: true}},
        scrum_master: {type: String, required:true, ref: 'users'},
        members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true}]
    },
    {
        timestamps: true,
    }
);


export default mongoose.model<ITeamModel>('Team', TeamSchema);