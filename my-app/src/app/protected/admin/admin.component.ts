import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrchestrationService } from 'src/app/orchestration/orchestration.service';
import { User, Users } from '../../_models/user'

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.css']
})

export class AdminComponent implements OnInit {

    createUserForm: FormGroup;
    modifyUserForm: FormGroup;
    users: User[] = [];
    currentId: string = '';
    
    constructor(private orchestration: OrchestrationService, private fb: FormBuilder){
        this.createUserForm = this.fb.group({
            username: ['',Validators.required],
            password: ['',Validators.required],
            role: ['',Validators.required],
            team: ['',Validators.required],
          });
        this.modifyUserForm = this.fb.group({
            username: ['',Validators.required],
            new_username: ['',Validators.required],
            password: ['',Validators.required, Validators.minLength(6)],
            role: ['',Validators.required],
            team: ['',Validators.required],
          });

    }

    ngOnInit(): void {
        this.getUsers();
        console.log(this.users);
    }

    currentUserSelect(id: string){
        this.currentId = id;
    }

    createUser(){
        console.log(this.createUserForm.value);
        this.orchestration.createUser(this.createUserForm.value).subscribe(data => {
            console.log('message', data);
            this.getUsers();
            this.createUserForm.reset();
        });
    }

    modifyUser(){
        this.orchestration.updateUser(this.modifyUserForm.value, this.currentId).subscribe(data => {
            console.log('message', data);
            this.getUsers();
            this.modifyUserForm.reset();
        })
    }

    getUsers(){
        this.orchestration.readAllUsers().subscribe(data => {
            this.users = data.users;
        });
    }
    //{"users":[{"_id":"63701e3dff431f182b5a36a3","username":"test","password":"$2b$10$XT4cE8MyFCe8rWLwBdTq4OTStVt7hdhyZ6lq4GczaVYbLUjD7Dor6","role":"admin","createdAt":"2022-11-12T22:29:17.510Z","updatedAt":"2022-11-12T22:29:17.510Z","__v":0},{"_id":"63701feaff431f182b5a36a9","username":"test1","password":"$2b$10$AkzP3Lt8PDQYjQJ0MhRIQOCnSSdpgcx0pg5Y84XAMWjEO3Z79n53S","role":"member","createdAt":"2022-11-12T22:36:26.287Z","updatedAt":"2022-11-12T22:36:26.287Z","__v":0},{"_id":"6371a59c740f80dca659cfbe","username":"test2","password":"$2b$10$yVbGEteKq7rRvNtvhPuHr.4WKRf7gWZlI0/9ixg8a0TkDrhjK3EsO","role":"member","createdAt":"2022-11-14T02:19:08.923Z","updatedAt":"2022-11-14T02:19:08.923Z","__v":0},{"_id":"6372ca5740a85b1d031885b6","username":"test3","password":"$2b$10$/pbPirLGb6iJWmaiPPINtuofUkUs.Mxq7Dc2O3KKe/ZjYiRUgQria","role":"stakeholder","team":"d3","createdAt":"2022-11-14T23:08:07.595Z","updatedAt":"2022-11-14T23:08:07.595Z","__v":0}]}

    getTeams(){

    }
}