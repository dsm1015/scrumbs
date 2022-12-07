import { Component, OnInit } from '@angular/core';
import { CurrentUser } from 'src/app/models/current-user';
import { Project } from 'src/app/models/project';
import { Team } from 'src/app/models/team';
import { User } from 'src/app/models/user';

import { OrchestrationService } from 'src/app/orchestration/orchestration.service';
import { AuthenticationService } from 'src/app/security/authentication.service';

@Component({
    selector: 'my-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})

// Dashboard component
export class DashboardComponent implements OnInit {
    //user var
    public currentUser!: CurrentUser;
    public isEng: boolean;
    public isStake: boolean;
    public isAdmin: boolean;
    public isMaster: boolean;

    public projects: Project [] = [];
    users: User[] = [];
    teams: Team[] = [];

    constructor(private authService: AuthenticationService, private orchestration: OrchestrationService) { 
      this.isEng=false;
      this.isStake=false;
      this.isAdmin=false;
      this.isMaster=false;

      const userJSON = localStorage.getItem('currentUser');
      const token = localStorage.getItem('id_token')
      console.log(userJSON);
      if(userJSON && token){
        const parsed = JSON.parse(userJSON);
        this.currentUser = {userId:'',userName:'',userRole:'',userToken:'',userTeam:''};
        this.currentUser = {userId: parsed.id_user, userName: parsed.userName, userRole: parsed.userRole, userTeam: parsed.userTeam, userToken: token};
        this.declareRole();
        console.log(this.currentUser);
      } else {
        console.log('missing user data');
      }
    }


    ngOnInit(): void {

    }

    declareRole(){
      const role = this.currentUser.userRole;
      switch (role) {
        case 'engineer':
          this.isEng = true;
          this.getProjectsAndTasks();
          break;
        case 'admin':
          this.isAdmin =true;
          this.getProjects();
          this.getUsers();
          this.getTeams();
          break;
        case 'scrum_master':
          this.isMaster = true;
          this.getProjects();
          this.getUsers();
          this.getTeams();
          break;
        case 'stakeholder':
          this.isStake = true;
          this.getProjects();
          break;
      }
    }

    getProjects(){
      this.orchestration.readAllProjects().subscribe(data => {
        this.projects = data.projects;
        console.log(this.projects);
      });
    }
    getProjectsAndTasks(){
      this.orchestration.readAllProjects().subscribe(data => {
        this.projects = data.projects;
        this.getProjectTasks(this.projects[0]._id)
        console.log(this.projects);
      });
    }
    getProjectTasks(id: string){
      this.orchestration.readAllProjectTasks(id).subscribe(data => {
        this.projects[0].taskList = data.project_tasks;
      });
    }
    getUsers(){
      this.orchestration.readAllUsers().subscribe(data => {
          console.log(data.users)
          this.users = data.users;
      });
    }
    getTeams(){
      this.orchestration.readAllTeams().subscribe(data => {
          console.log(data.teams)
          this.teams = data.teams;
      });
    }
}