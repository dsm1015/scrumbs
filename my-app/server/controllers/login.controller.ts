import { NextFunction, Request, Response } from "express";
import User from '../models/user.model';
import { generateToken, getToken, getTokenRole, verifyToken } from "../security/token";

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
            if(token){
                // return token
                return res.status(200).json({ userToken: token, userId: user._id, userName: user.username, userRole: user.role, userTeam: user.team });
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

const getRole = (req: Request, res: Response, next: NextFunction) => {

    const token = getToken(req);
    if(!token){
        return res.status(403).send({
            success: false,
            message: 'No token provided.',
        });
    } else {
        const role: string = getTokenRole(token);
        console.log(role);
        if(role){
            return res.status(200).json({role: role});
        }
        else{
            return res.status(404).json({message: "no role found."});
        }
    }
}

export default {login, getRole};