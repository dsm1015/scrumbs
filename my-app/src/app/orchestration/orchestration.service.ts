import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Logs } from "../models/log";
import { Projects, Tasks } from "../models/project";
import { Team, Teams } from "../models/team";
import { User, Users } from "../models/user";

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

    updateTeam(team: any, id: string){
        return this.http.patch(`${environment.API_URL}/teams/update/${id}`, { team });
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

    readUser(id: string){
        return this.http.get<any>(`${environment.API_URL}/users/get/${id}`);
    }

    readAllUsers(){
        return this.http.get<Users>(`${environment.API_URL}/users/get/`);
    }

    updateUser(user: any, id: string){
        return this.http.patch(`${environment.API_URL}/users/update/${id}`, { user });
    }

    deleteUser(id: any){
        return this.http.delete(`${environment.API_URL}/users/delete/${id}`);
    }

    // PROJECTS //

    createProject(project: any) {
        return this.http.post(`${environment.API_URL}/projects/create`, { project });
    }

    readProject(){

    }

    readAllProjects(){
        return this.http.get<Projects>(`${environment.API_URL}/projects/get/`);
    }

    updateProject(project: any, id: string){
        return this.http.patch(`${environment.API_URL}/projects/update/${id}`, { project });
    }

    deleteProject(id: any){
        return this.http.delete(`${environment.API_URL}/projects/delete/${id}`);
    }

    // TASKS //

    readAllProjectTasks(id: any){
        return this.http.get<Tasks>(`${environment.API_URL}/projects/tasks/get/${id}`);
    }

    updateProjectTask(project_task: any, id: string){
        return this.http.patch(`${environment.API_URL}/projects/tasks/update/${id}`, { project_task } );
    }

    createProjectTask(project_task: any){
        return this.http.post(`${environment.API_URL}/projects/tasks/create`, { project_task });
    }

    // LOGS //

    readLogs(start: string, end: string){
        return this.http.get<Logs>(`${environment.API_URL}/logs/get/${start}/${end}`);
    }



}