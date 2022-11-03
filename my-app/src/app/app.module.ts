import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './public/login/login.component';
import { DashboardComponent } from './protected/dashboard/dashboard.component';

//Angular Material Imports
import { FlexLayoutModule } from '@angular/flex-layout'; //flex layout
import { MatFormFieldModule } from '@angular/material/form-field'; //forms
import { MatInputModule } from '@angular/material/input'; //inputs
import { MatButtonModule } from '@angular/material/button'; //buttons
import { MatCardModule } from '@angular/material/card'; //cards
import { MatToolbarModule } from '@angular/material/toolbar'; //toolbar

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent
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
    MatToolbarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
