import { NextFunction, Request, Response } from "express";
import mongoose from 'mongoose';
import User from '../models/user.model';
import { generateToken, isAdmin, verifyToken } from "../security/token";

const createUser = (req: Request, res: Response, next: NextFunction) => {
    const { username, password, role } = req.body;

    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        username,
        password,
        role
    });

    return user
        .save()
        .then(user => res.status(201).json({user}))
        .catch(error => res.status(500).json({error}));
};

const readUser = (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.userId;

    return User.findById(userId)
        .then((user) => (user ? res.status(200).json({ user }) : res.status(404).json({ message: 'Not found'})))
        .catch((error) => res.status(500).json({error}));
};

const readAllUser = (req: Request, res: Response, next: NextFunction) => {
    return User.find()
        .then((users) => res.status(200).json({ users }))
        .catch((error) => res.status(500).json({error}));
};

const updateUser = (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.userId;

    return User.findById(userId)
        .then((user) => {
            if(user)
            {
                user.set(req.body);
                return user
                    .save()
                    .then(user => res.status(201).json({user}))
                    .catch(error => res.status(500).json({error}));
            } else {
                res.status(404).json({ message: 'Not found'});
            }
        })
        .catch((error) => res.status(500).json({error}));
};

const deleteUser = (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.userId;

    return User.findByIdAndDelete(userId)
        .then((user) => (user ? res.status(201).json({message: 'deleted'}) : res.status(404).json({ message: 'Not Found'})))
        .catch((error) => res.status(500).json({error}));
};

const login = (req: Request, res: Response, next: NextFunction) => {
    const {username, password} = req.body;

    // check for data
    if(!username || !password){
        return res.status(400).json({ message: "Missing Data" });
    }
    // find user info
    User.findOne({username}, async function(err: any, user: any){
        // if no user found
        if(!user || !user.password){
            return res.status(401).json({ message: "Username or Password Incorrect" });
        }

        if(err){
            console.log(err);
        }
        
        // check password
        const isPassValid = await user.comparePassword(password);
        if(isPassValid){
            // generate token
            const token = generateToken(user);
            const isTokenValid: boolean = verifyToken(token);
            if(isTokenValid){
                // return token
                return res.status(200).json({ userToken: token, userId: user._id });
            }
            else{
                return res.status(500).json({message: "Token Generation error"})
            }
        }
        else{
            return res.status(401).json({ message: "Username or Password Incorrect" });
        }
    });
}

export default { createUser, readUser, readAllUser, updateUser, deleteUser, login};
