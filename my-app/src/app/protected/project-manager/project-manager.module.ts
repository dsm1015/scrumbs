import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, Routes } from '@angular/router';

import { ProjectManagerComponent } from './project-manager.component';

const ProjectManagerRoutes: Routes = [
    { path: '',  component: ProjectManagerComponent }
];

export const ProjectManagerRouting = RouterModule.forChild(ProjectManagerRoutes);


@NgModule({
    imports: [ 
        CommonModule, 
        ProjectManagerRouting
    ],
    declarations: [ ProjectManagerComponent ]
})

export class ProjectManagerModule{

    constructor(private router: Router){
    }
}