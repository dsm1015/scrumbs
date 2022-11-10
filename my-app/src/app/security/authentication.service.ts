import { Injectable } from "@angular/core"
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http'
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { tap, shareReplay, map, catchError } from 'rxjs/operators';
import * as moment from 'moment';

import {LoginRequest, LoginResponse} from'../public/interfaces'
import { User } from '../_models/user'
import { environment } from "src/environments/environment";
import { Router } from "@angular/router";

@Injectable({
    providedIn: 'root'
})

export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User> | undefined;
    public currentUser: Observable<User> | undefined;
    headers = new HttpHeaders().set('Content-Type', 'application/json');

    constructor(private http: HttpClient, private router: Router){
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
        //send login data to server
        return this.http.post<User>(`${environment.API_URL}/authenticate`, { username, password })
        .subscribe((res:any) => {
            this.setSession(res)
            this.getUserProfile(res._id).subscribe((res) => {
                this.currentUser = res;
                this.router.navigate(['/dashboard' + res.msg._id]);
              });
        })
    }

    getToken() {
        return localStorage.getItem('id_token');
    }

    getUserProfile(id: any): Observable<any> {
        let api = `${environment.API_URL}/user-profile/${id}`;
        return this.http.get(api, { headers: this.headers }).pipe(
          map((res) => {
            return res || {};
          }),
          catchError(this.handleError)
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
        this.router.navigate(['/login'])
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

    // Error
    handleError(error: HttpErrorResponse) {
        let msg = '';
        if (error.error instanceof ErrorEvent) {
        // client-side error
        msg = error.error.message;
        } else {
        // server-side error
        msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        return throwError(msg);
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
