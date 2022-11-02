import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './protected/dashboard/dashboard.component';
import { ProjectManagerComponent } from './protected/project-manager/project-manager.component';
import { LoginComponent } from './public/login/login.component';
import { AuthenticationGaurd } from './security/authentication.gaurd'

//Angular Material Imports
import { FlexLayoutModule } from '@angular/flex-layout'; //flex layout
import {MatFormFieldModule} from '@angular/material/form-field'; //forms
import {MatInputModule} from '@angular/material/input'; //inputs
import {MatButtonModule} from '@angular/material/button'; //buttons
import {MatCardModule} from '@angular/material/card'; //cards

import { AppComponent } from './app.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' }, //defualt route
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent }, //, canActivate: [AuthenticationGaurd]
  { path: 'projects', component: ProjectManagerComponent }, //canActivate: [AuthenticationGaurd],
  {
    path: '**',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes),],
  exports: [RouterModule]
})
export class AppRoutingModule {
}