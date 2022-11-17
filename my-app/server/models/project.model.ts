import mongoose, { Document, Schema } from 'mongoose';
import { ITeam } from './team.model';

export interface IProject {
    title: string;
    description: string;
    teams: ITeam[];
}

export interface IProjectModel extends IProject, Document {}

const ProjectSchema: Schema = new Schema(
    {
        title: { type: String, required: true, unique: true},
        description: { type: String, reuired: true},
        teams: [{ type: mongoose.Schema.Types.ObjectId, ref: 'teams', required: true}]
    },
    {
        timestamps: true
    }
);

export default mongoose.model<IProjectModel>('Project', ProjectSchema);