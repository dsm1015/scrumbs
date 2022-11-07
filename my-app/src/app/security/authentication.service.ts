import { Injectable } from "@angular/core"
import { HttpClient } from '@angular/common/http'
import { BehaviorSubject, Observable } from 'rxjs';
import { tap, shareReplay } from 'rxjs/operators';
import * as moment from 'moment';

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

    login(username: string, password: string) {
        return this.http.post<User>(`/api/login`, { username, password }).pipe(
            tap(res => this.setSession),
            shareReplay()
        );
    }

    private setSession(authResult: { expiresIn: any; idToken: string; }) {
        const expiresAt = moment().add(authResult.expiresIn,'second');

        localStorage.setItem('id_token', authResult.idToken);
        localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()) );
    }

    logout() {
        localStorage.removeItem("id_token");
        localStorage.removeItem("expires_at");
    }

    public isLoggedIn() {
        return moment().isBefore(this.getExpiration());
    }

    isLoggedOut() {
        return !this.isLoggedIn();
    }

    getExpiration() {
        const expiration = localStorage.getItem("expires_at");
        if(expiration){
            const expiresAt = JSON.parse(expiration);
            return moment(expiresAt);
        }
        return expiration;
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
