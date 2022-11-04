import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, Routes } from '@angular/router';

import { ProjectManagerComponent } from './project-manager.component';

//Angular Material Imports
import { FlexLayoutModule } from '@angular/flex-layout'; //flex layout
import { MatFormFieldModule } from '@angular/material/form-field'; //forms
import { MatInputModule } from '@angular/material/input'; //inputs
import { MatButtonModule } from '@angular/material/button'; //buttons
import { MatCardModule } from '@angular/material/card'; //cards
import { MatToolbarModule } from '@angular/material/toolbar'; //toolbar
import { MatGridListModule } from '@angular/material/grid-list'; //grid

const ProjectManagerRoutes: Routes = [
    { path: '',  component: ProjectManagerComponent }
];

export const ProjectManagerRouting = RouterModule.forChild(ProjectManagerRoutes);


@NgModule({
    imports: [ 
        CommonModule, 
        ProjectManagerRouting,
        FlexLayoutModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatCardModule,
        MatToolbarModule,
        MatGridListModule
    ],
    declarations: [ ProjectManagerComponent ]
})

export class ProjectManagerModule{

    constructor(private router: Router){
    }
}