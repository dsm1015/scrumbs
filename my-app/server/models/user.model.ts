import mongoose, { Document, Schema } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { config } from '../config/config'

export interface IUser {
    username: string;
    password: string;
    role: string;
    team?: string;
    token?: string;
}

export interface IUserModel extends IUser, Document {}

const UserSchema: Schema = new Schema(
    {
        username: { type: String, required: true, index: {unique: true}},
        password: { type: String, required: true}, //select: false
        role: { type: String, required: true},
        team: { type: String, required: false},
        token: { type: String, required: false}
    },
    {
        timestamps: true,
    }
);


// SECURITY //

// before 'saving' user data, hash it
UserSchema.pre('save', function(next) {
    if(this.isModified('password')){
        bcrypt.hash(this.password, config.salt.factor, (err, hash) => {
            if(err) return next(err);
            this.password = hash;
            next();
        })
    }
});

// method to compare password with passed password on user schema
UserSchema.methods.comparePassword = async function (password: string | Buffer){
    if(!password) throw new Error('Password missing!')

    try{
        const result = await bcrypt.compare(password, this.password)
        return result;
    } catch (error){
        console.log('Error while comparing password', error);
    }
}

export default mongoose.model<IUserModel>('User', UserSchema);