import { Injectable } from "@angular/core"
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http'
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import * as moment from 'moment';

import { CurrentUser } from '../models/current-user'
import { environment } from "src/environments/environment";
import { OrchestrationService } from 'src/app/orchestration/orchestration.service';
import { Router } from "@angular/router";
import { User } from "../models/user";

@Injectable({
    providedIn: 'root'
})

export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<CurrentUser> | undefined;
    public currentUser: Observable<CurrentUser> | undefined;
    public currentUserAttr: User;
    headers = new HttpHeaders().set('Content-Type', 'application/json');

    constructor(private http: HttpClient, private router: Router, private orchestration: OrchestrationService){
        const userJson = localStorage.getItem('currentUser');
        if(userJson){
            this.currentUserSubject = new BehaviorSubject<CurrentUser>(JSON.parse(userJson))
            this.currentUser = this.currentUserSubject.asObservable();
        }
        this.currentUserAttr={_id: "", username: "", role: ""};
        //this.getCurrentUser();
    }

    public get currentUserValue(): CurrentUser {
        if(this.currentUserSubject?.value){
            return this.currentUserSubject?.value;
        }
        const retVal: CurrentUser = {userId:'',userName: '',userRole:'',userToken:''};
        return retVal;
    }

    login(username: string, password: string) {
        //send login data to server
        const response = this.http.post<CurrentUser>(`${environment.API_URL}/login`, { username, password });
        const observer = {
            next: (res: any) => {
                this.setSession(res);
                this.router.navigate(['/dashboard']);
               /*  this.getUserProfile().subscribe((res) => {
                    this.currentUser = res;
                    this.router.navigate(['/dashboard']);
                    });
                */
            },
            error: (err: Error) => console.log(err)
        };
        return response.subscribe(observer);
    }

    // get token from local storage
    getToken() {
        return localStorage.getItem('id_token');
    }

    getUserId(){
        return localStorage.getItem('id_user')
    }

    // get user profile, pass in token and verify
    getUserProfile(): Observable<any> {
        const api = `${environment.API_URL}/login/role`;
        return this.http.get(api, { headers: this.headers }).pipe(
          map((res) => {
            console.log(res);
            return res || {};
          }),
          catchError(this.handleError)
        );
      }

    private setSession(authResult: any ) {
        const userJSON = {'id_user':  authResult.userId, 'userName': authResult.userName, 'userRole': authResult.userRole, 'userTeam': authResult.userTeam};
        localStorage.setItem('currentUser', JSON.stringify(userJSON));
        localStorage.setItem('id_token', authResult.userToken);
    }

    logout() {
        localStorage.clear();
        this.router.navigate(['/login'])
    }

    public isLoggedIn() {
       if(this.getToken()){
            return true;
       }
       return false;
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

}
