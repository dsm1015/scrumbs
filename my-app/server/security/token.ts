import * as jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from "express";
import * as fs from 'fs';
import path from 'path';

const privateKey = fs.readFileSync(path.resolve('./security/jwtRS256.key'), 'utf8');
const publicKey = fs.readFileSync(path.resolve('./security/jwtRS256.key.pub'), 'utf8');

export function generateToken(user: any){
    try{
        if(user){
            const jwtBearerToken = jwt.sign(
                {
                    userId: user._id,
                    username: user.username,
                    role:  user.role,
                }, 
                privateKey,
                { 
                    algorithm: 'RS256',
                    expiresIn: '3h', // 3 hours
                    subject: user.username
                });
            return jwtBearerToken;
        }
    }
    catch(error) {
        console.log(error);
        return error;
    }
}

export function getToken(req: Request){
    const token = req.headers.authorization
    if(token){
        return token.split(' ')[1];
    }
    return token
}

export function verifyToken(req: Request, res: Response ,next: NextFunction){
    const token = getToken(req);
    if(!token){
        return res.status(403).send({
            success: false,
            message: 'No token provided.',
        });
    } else {
        jwt.verify(token, publicKey, (err, decoded) => {
            if (err) {
                return res.json({
                    success: false,
                    message: 'Failed to authenticate token.',
                })
            } else {
                //req.decoded = decoded
                console.log("TOKEN VALID!!", decoded);
                next();
            }
        });
    }
}

export function verifyAdminToken(req: Request, res: Response ,next: NextFunction){
    const token = getToken(req);
    if(!token){
        return res.status(403).send({
            success: false,
            message: 'No token provided.',
        });
    } else {
        jwt.verify(token, publicKey, function(err: any, decoded: any){
            if (err) {
                return res.status(403).json({
                    success: false,
                    message: 'Failed to authenticate token.',
                });
            } else {
                if (decoded.role === 'admin'){
                    console.log("ADMIN AUTHORIZED", decoded);
                    next();
                }
                else{
                    return res.status(403).json({
                        success: false,
                        message: 'Requires Admin.',
                    });
                }
            }
        });
    }
}

export function getTokenRole(token: any): string{
    var role = ''
    jwt.verify(token, publicKey, function(err: any, decoded: any){
        if (err) {
            return role;
        } else {
            console.log(decoded);
            role = decoded.role;
            if(role){
                return role;
            } else {
                return '';
            }
        }
    });
    return role;
}