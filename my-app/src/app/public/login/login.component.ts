import { Component } from "@angular/core";
import { AuthenticationService } from '../services/authentication.service';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    //styleUrls: ['./login.component.css']
})

export class LoginComponent {

    constructor(
        private authService: AuthenticationService
    ) { }

    // public login: send creds from form to server
    login() {
        //request with token for validation
        //request session
    }

}