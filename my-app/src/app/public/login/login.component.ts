import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthenticationService } from 'src/app/security/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{

  loginForm:FormGroup;

  constructor(
    private fb:FormBuilder,
    private authService: AuthenticationService,
    private router: Router
    ) {
      this.loginForm = this.fb.group({
        username: ['',Validators.required],
        password: ['',Validators.required]
      });
    }

  login(){
    const val = this.loginForm.value;
    if(val.username && val.password){
      const res = this.authService.login(val.username, val.password);
    }
  }

}
