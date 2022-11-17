import mongoose, { Document, Schema } from 'mongoose';
import { IProject } from "./project.model";

export interface IProjectTask {
    project: IProject;
    title: string;
    description: string;
    status: string;
}

export interface IProjectTaskModel extends IProjectTask, Document {}

const ProjectTaskSchema: Schema = new Schema(
    {
        project: { type: mongoose.Schema.Types.ObjectId, ref: 'projects', required: true},
        title: { type: String, required: true, unique: true},
        description: { type: String, reuired: true},
        status: { type: String, reuired: true}
    },
    {
        timestamps: true
    }
);

export default mongoose.model<IProjectTaskModel>('ProjectTask', ProjectTaskSchema);