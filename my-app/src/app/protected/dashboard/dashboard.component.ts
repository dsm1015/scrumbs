import { Component, OnInit } from '@angular/core';
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
    public currentUser: User;
    public isEng: boolean;
    public isStake: boolean;
    public isAdmin: boolean;
    public isMaster: boolean;

    constructor(private authService: AuthenticationService, private orchestration: OrchestrationService) { 
      this.isEng=false;
      this.isStake=false;
      this.isAdmin=false;
      this.isMaster=true;
      this.currentUser=this.authService.currentUserAttr;
      console.log(this.authService.currentUserAttr);
      console.log(authService.getCurrentUser());
  }


    ngOnInit(): void {

    }
}