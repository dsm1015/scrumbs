import * as jwt from 'jsonwebtoken';
import { config } from '../config/config';
import * as fs from 'fs';
import path from 'path';

const privateKey = fs.readFileSync(path.resolve('./security/jwtRS256.key'), 'utf8');
const publicKey = fs.readFileSync(path.resolve('./security/jwtRS256.key.pub'), 'utf8');

export function generateToken(user: any){
    try{
        if(user){
            const jwtBearerToken = jwt.sign(
                { 
                    username: user.username,
                    role:  user.role,
                }, 
                privateKey,
                { 
                    algorithm: 'RS256',
                    expiresIn: 120,
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

export function verifyToken(token: any): boolean{
    try{
        const decoded = jwt.verify(token, publicKey);
            return true;
        }catch(error){
        //terminate session
        console.log(error);
        return false;
    }
}

export function isAdmin(token: any): boolean{
    var retval = false;
    jwt.verify(token, publicKey, function(err: any, decoded: any){
        decoded.role === 'admin'?  retval = true : retval = false;
        if(err){
            retval = false;
        }
    });
    return retval;
}