import mongoose, { Document, Schema } from 'mongoose';

export interface IProject {
    name: string;
    description: string;
}

export interface IProjectModel extends IProject, Document {}

const ProjectSchema: Schema = new Schema(
    {
        name: { type: String, required: true},
        description: { type: String, reuired: true}  
    },
    {
        timestamps: true
    }
);

export default mongoose.model<IProjectModel>('Project', ProjectSchema);