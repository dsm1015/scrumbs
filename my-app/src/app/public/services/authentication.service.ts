import { Injectable } from "@angular/core"
import { HttpClient } from '@angular/common/http'

import {LoginRequest, LoginResponse} from'../interfaces'

@Injectable({
    providedIn: 'root'
})

export class AuthenticationService {

    constructor(private http: HttpClient){
    }

    //function to login
    Login(loginRequest: LoginRequest){
        
        return //return response
    }
}