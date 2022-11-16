import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './protected/dashboard/dashboard.component';
import { ProjectManagerComponent } from './protected/project-manager/project-manager.component';
import { LoginComponent } from './public/login/login.component';
import { AdminComponent } from './protected/admin/admin.component';
import { ReportViewerComponent } from './protected/report-viewer/report-viewer.component';
import { AuthenticationGaurd } from './security/authentication.gaurd';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' }, //defualt route
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', canActivate: [AuthenticationGaurd], component: DashboardComponent }, 
  { path: 'projects', canActivate: [AuthenticationGaurd], component: ProjectManagerComponent },
  { path: 'settings', canActivate: [AuthenticationGaurd], component: AdminComponent },
  { path: 'report-viewer', canActivate: [AuthenticationGaurd], component: ReportViewerComponent },
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