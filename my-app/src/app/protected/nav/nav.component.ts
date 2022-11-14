import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/security/authentication.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  //user var
  public isEng: boolean;
  public isStake: boolean;
  public isAdmin: boolean;

  constructor(private authService: AuthenticationService) { 
    this.isEng=false;
    this.isStake=false;
    this.isAdmin=true;
  }

  ngOnInit(): void {
  }

  logout(){
    this.authService.logout();
  }

}