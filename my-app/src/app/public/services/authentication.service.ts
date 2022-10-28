import { Injectable } from "@angular/core"
import { HttpClient, HttpXsrfTokenExtractor } from '@angular/common/http'

import {LoginRequest, LoginResponse} from'../interfaces'

@Injectable({
    providedIn: 'root'
})

export class AuthenticationService {

    constructor(private http: HttpClient){
    }
    
    //create token with secret key, send token back to the client
    CreateToken(loginRequest: LoginRequest){
        // return token or invalid response
    }

    //validate token has not been tampered with
    AuthenticateToken(token: LoginResponse){
        // return valid or generate error for valid
    }

    //provide vague error if auth fails
    generateError(){
        //incorrect user/pass
    }
}