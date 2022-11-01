import { Injectable } from "@angular/core"
import { HttpClient } from '@angular/common/http'
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import {LoginRequest, LoginResponse} from'../public/interfaces'
import { User } from '../_models/user'
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})

export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User> | undefined;
    public currentUser: Observable<User> | undefined;

    constructor(private http: HttpClient){
        const userJson = localStorage.getItem('currentUser');
        if(userJson){
            this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(userJson))
            this.currentUser = this.currentUserSubject.asObservable();
        }
    }

    public get currentUserValue(): User | undefined {
        return this.currentUserSubject?.value;
    }

    login(username: any, password: any) {
        return this.http.post<any>(`${environment.API_URL}/users/authenticate`, { username, password })
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user));
                if(this.currentUserSubject){
                    this.currentUserSubject.next(user);
                }
                return user;
            }));
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