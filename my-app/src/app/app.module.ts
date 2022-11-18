import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './public/login/login.component';
import { DashboardComponent } from './protected/dashboard/dashboard.component';
import { ProjectManagerComponent } from './protected/project-manager/project-manager.component';
import { AdminComponent } from './protected/admin/admin.component';
import { NavComponent } from './protected/nav/nav.component';
import { ReportViewerComponent } from './protected/report-viewer/report-viewer.component';
import { AuthInterceptor } from './security/authconfig.interceptor'
import { ProjectDialogComponent } from './protected/project-manager/project-dialog.component';
import { FilterStatusPipe } from './pipes/filter-status.pipe';

//Angular Material Imports
import { FlexLayoutModule } from '@angular/flex-layout'; //flex layout
import { MatFormFieldModule } from '@angular/material/form-field'; //forms
import { MatInputModule } from '@angular/material/input'; //inputs
import { MatButtonModule } from '@angular/material/button'; //buttons
import { MatCardModule } from '@angular/material/card'; //cards
import { MatToolbarModule } from '@angular/material/toolbar'; //toolbar
import { MatGridListModule } from '@angular/material/grid-list'; //grid
import { MatSidenavModule } from '@angular/material/sidenav'; //sidebar
import { MatListModule } from '@angular/material/list'; //list
import { MatSelectModule } from '@angular/material/select'; //select
import { MatDatepickerModule } from '@angular/material/datepicker'; //datepicker
import { MatNativeDateModule } from '@angular/material/core'; //date
import { MatDialogModule } from '@angular/material/dialog'; //dialog
import { MatMenuModule } from '@angular/material/menu';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS  } from '@angular/common/http';


//Font Awesome
//import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    ProjectManagerComponent,
    AdminComponent,
    NavComponent,
    ReportViewerComponent,
    ProjectDialogComponent,
    FilterStatusPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    MatGridListModule,
    MatSidenavModule,
    MatListModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    MatMenuModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    //FontAwesomeModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { floatLabel: 'always' },
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
