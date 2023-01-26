import { Component, OnInit } from '@angular/core';
import { CurrentUser } from 'src/app/models/current-user';
import { AuthenticationService } from 'src/app/security/authentication.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  //user var
  public currentUser!: CurrentUser;
  public isEng: boolean;
  public isStake: boolean;
  public isAdmin: boolean;

  constructor(private authService: AuthenticationService) { 
    this.isEng=false;
    this.isStake=false;
    this.isAdmin=false;

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
        break;
      case 'admin':
        this.isAdmin =true;
        break;
      case 'scrum_master':
        this.isEng = true;
        break;
      case 'stakeholder':
        this.isStake = true;
        break;
    }
  }

  logout(){
    this.authService.logout();
  }

}