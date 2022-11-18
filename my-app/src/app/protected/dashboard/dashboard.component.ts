import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/security/authentication.service';

@Component({
    selector: 'my-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})

// Dashboard component
export class DashboardComponent implements OnInit {
    //user var
    public isEng: boolean;
    public isStake: boolean;
    public isAdmin: boolean;
    public isMaster: boolean;

    constructor(private authService: AuthenticationService) { 
    this.isEng=false;
    this.isStake=false;
    this.isAdmin=false;
    this.isMaster=true;
  }

    ngOnInit(): void {

    }
}