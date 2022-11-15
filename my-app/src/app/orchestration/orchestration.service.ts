import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { User, Users } from "../_models/user";

@Injectable({
    providedIn: 'root'
})

export class OrchestrationService{
    
    constructor(private http: HttpClient){
        
    }

    // TEAMS //

    createTeam(){

    }

    updateTeam(){

    }

    readTeam(){

    }
    
    readAllTeams(){

    }

    deleteTeam(){

    }


    // USERS //

    createUser(user: any) {
        return this.http.post(`${environment.API_URL}/users/create`, { user });
    }

    readUser(){

    }

    readAllUsers(){
        return this.http.get<Users>(`${environment.API_URL}/users/get/`);
    }

    updateUser(user: any, id: any){
        return this.http.patch(`${environment.API_URL}/users/update/${id}`, { user });

    }

    deleteUser(){

    }

    // PROJECTS //


}