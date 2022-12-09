import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { OrchestrationService } from 'src/app/orchestration/orchestration.service';
import { Team } from 'src/app/models/team';
import { User} from '../../models/user'
import { MessageDialogComponent } from './dialog/message.component';
import { Log} from '../../models/log';

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.css']
})

export class AdminComponent implements OnInit {

    // FORMS //
    createUserForm: FormGroup;
    modifyUserForm: FormGroup;
    deleteUserForm: FormGroup;
    createTeamForm: FormGroup;
    modifyTeamForm: FormGroup;
    deleteTeamForm: FormGroup;
    logDateRangeForm: FormGroup;

    // ATTRIBUTES //
    users: User[] = [];
    teams: Team[] = [];
    //ELEMENT_DATA: LogAttributes[] = [];
    logTable!: Log;
    scrum_masters: User[] = [];
    currentUserId?: string = '';
    currentTeamId?: string = '';
    
    constructor(private orchestration: OrchestrationService, private fb: FormBuilder, public dialog: MatDialog){
        // User
        this.createUserForm = this.fb.group({
            username: ['',Validators.required],
            password: ['',Validators.required],
            role: ['',Validators.required],
            team: ['',Validators.required],
        });
        this.modifyUserForm = this.fb.group({
            username: ['',Validators.required],
            password: ['',[Validators.required, Validators.minLength(6)]],
            role: ['',Validators.required],
            team: ['',Validators.required],
        });
        this.deleteUserForm = this.fb.group({
            id: ['',Validators.required]
        });
        // Team
        this.createTeamForm = this.fb.group({
            name: ['',Validators.required],
            scrum_master: ['',Validators.required]
        });
        this.modifyTeamForm = this.fb.group({
            name: ['',Validators.required],
            scrum_master: ['',Validators.required]
        });
        this.deleteTeamForm = this.fb.group({
            id: ['',Validators.required]
        });
        this.logDateRangeForm = this.fb.group({
            start: ['', Validators.required],
            end: ['',Validators.required]
        })

        // LOG TABLE
        this.logTable = {
            dataSource: [{timestamp: null, level: '', message: ''}],
            displayedColumns: ['timestamp', 'level', 'message']
        };

    }

    ngOnInit(): void {
        this.getUsers();
        this.getTeams();
        console.log(this.users);
    }

    //message
    generateMessage(data: any){
        let dialogRef = this.dialog.open(MessageDialogComponent, {
            width: '250px',
            data: { message: data }
          });
        
          dialogRef.afterClosed().subscribe(result => {
            data = result;
          });
    }

    // get id from username
    getUserId(username: string){
        const user = this.users.find(user => user.username == username);
        const id = user?._id;
        return id;
    }

    createUser(){
        this.orchestration.createUser(this.createUserForm.value).subscribe(data => {
            console.log('message', data);
            //refresh users
            this.getUsers();
            //throw message to user
            this.generateMessage("User Created");
            //reset form
            this.createUserForm.reset();
        });
    }

    deleteUser(){
        this.orchestration.deleteUser(this.deleteUserForm.value.id).subscribe(data => {
            //refresh users
            this.getUsers();
            //throw message to user
            this.generateMessage("User Deleted");
            //reset form
            this.deleteUserForm.reset();
        });
    }

    modifyUser(){
        const userId = this.currentUserId;
        if(userId){
            this.orchestration.updateUser(this.modifyUserForm.value, userId).subscribe(data => {
                console.log('message', data);
                //refresh users
                this.getUsers();
                //throw message to user
                this.generateMessage("User Modified");
                //reset form
                this.modifyUserForm.reset();
            })
        } else {
            console.log("no id found");
        }
    }

    getUsers(){
        this.orchestration.readAllUsers().subscribe(data => {
            console.log(data.users)
            this.users = data.users;
            this.getScrumMasters();
        });
    }
    getScrumMasters(){
        this.scrum_masters = this.users.filter(user => user.role === 'scrum_master');
        console.log("masters", this.scrum_masters);
    }

    getTeams(){
        this.orchestration.readAllTeams().subscribe(data => {
            console.log(data.teams)
            this.teams = data.teams;
        });
    }

    createTeam(){
        this.orchestration.createTeam(this.createTeamForm.value).subscribe(data => {
            console.log('message', data);
            //refresh teams
            this.getTeams();
            //throw message to user
            this.generateMessage("Team Created");
            //reset form
            this.createTeamForm.reset();
        });
    }

    modifyTeam(){
        const teamId = this.currentTeamId;
        if(teamId){
            this.orchestration.updateTeam(this.modifyTeamForm.value, teamId).subscribe(data => {
                console.log('message', data);
                //refresh teams
                this.getTeams();
                //throw message to user
                this.generateMessage("Team Modified");
                //reset form
                this.modifyTeamForm.reset();
            })
        } else {
            console.log("no team Id found.")
        }
    }

    deleteTeam(){
        this.orchestration.deleteTeam(this.deleteTeamForm.value.id).subscribe(data => {
            //refresh teams
            this.getTeams();
            //throw message to user
            this.generateMessage("Team Deleted");
            //reset form
            this.deleteTeamForm.reset();
        });
    }

    getLogs(){
        const start = new Date(this.logDateRangeForm.value.start).toISOString()
        const end = new Date(this.logDateRangeForm.value.end).toISOString()
        console.log(start, end);
        
        this.orchestration.readLogs(start, end).subscribe(data => {
            //change table data
            console.log(data)
            const LOG_DATA = data.logs;
            console.log(LOG_DATA[0].timestamp, LOG_DATA);
            this.logTable.dataSource = LOG_DATA;
        })

    }
}