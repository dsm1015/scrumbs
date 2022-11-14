import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProtectedRoutingModule } from './protected-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ReportViewerComponent } from './report-viewer/report-viewer.component';

@NgModule({
  declarations: [
    DashboardComponent,
    ReportViewerComponent
    //ProjectManager
    //AdminComponent
  ],
  imports: [
    CommonModule,
    // Import our Routes for this module
    ProtectedRoutingModule,
  ]
})
export class ProtectedModule { }