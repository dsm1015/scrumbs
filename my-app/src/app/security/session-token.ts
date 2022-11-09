import {Request, Response} from "express";
import * as jwt from 'jsonwebtoken';
import * as fs from "fs";

const RSA_PRIVATE_KEY = fs.readFileSync('./private.key');

export function loginRoute(req: Request, res: Response) {

    const user = req.body.user,
          password = req.body.password;

    if (validateUserAndPassword(user, password)) {
       const userId = findUserIdForUser(user);

        //sign token 
        const jwtBearerToken = jwt.sign({}, RSA_PRIVATE_KEY, {
                algorithm: 'RS256',
                expiresIn: 120,
                subject: userId
            });
        console.log(jwtBearerToken);

        // send token back to user via http
        res.status(200).json({
            idToken: jwtBearerToken, 
            expiresIn: 120
        });                     
    }
    else {
        // send status 401 Unauthorized
        res.sendStatus(401); 
    }

}

function validateUserAndPassword(user: string, password: string): Boolean {
    //CALL DB and compare

    //TEST CODE - replace with db calls
    const DBRes = {user:"test",password:"test"}
    if(DBRes.user == user && DBRes.password == password){
        return true;
    }
    else
        return false;
}
function findUserIdForUser(user: any) {
    //DB and get id
    return "1234"
}

