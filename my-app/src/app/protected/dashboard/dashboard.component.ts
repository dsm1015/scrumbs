import { Component, OnInit } from '@angular/core';
import { CurrentUser } from 'src/app/models/current-user';
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
    public currentUser: CurrentUser;
    public isEng: boolean;
    public isStake: boolean;
    public isAdmin: boolean;
    public isMaster: boolean;

    constructor(private authService: AuthenticationService, private orchestration: OrchestrationService) { 
      this.isEng=false;
      this.isStake=false;
      this.isAdmin=false;
      this.isMaster=true;
      const userJSON = localStorage.getItem('currentUser');
      this.currentUser= authService.currentUserValue;
      console.log(this.currentUser);
    }


    ngOnInit(): void {

    }
}