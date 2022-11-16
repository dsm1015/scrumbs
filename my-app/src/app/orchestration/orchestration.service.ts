import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Team, Teams } from "../_models/team";
import { User, Users } from "../_models/user";

@Injectable({
    providedIn: 'root'
})

export class OrchestrationService{
    
    constructor(private http: HttpClient){
        
    }

    // TEAMS //

    createTeam(team: any){
        return this.http.post(`${environment.API_URL}/teams/create`, { team });
    }

    updateTeam(team: Team){
        return this.http.patch(`${environment.API_URL}/teams/update/${team._id}`, { team });
    }

    readTeam(){

    }
    
    readAllTeams(){
        return this.http.get<Teams>(`${environment.API_URL}/teams/get/`);
    }

    deleteTeam(id: any){
        return this.http.delete(`${environment.API_URL}/teams/delete/${id}`);
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

    updateUser(user: User){
        return this.http.patch(`${environment.API_URL}/users/update/${user._id}`, { user });
    }

    deleteUser(id: any){
        return this.http.delete(`${environment.API_URL}/users/delete/${id}`);
    }

    // PROJECTS //


}