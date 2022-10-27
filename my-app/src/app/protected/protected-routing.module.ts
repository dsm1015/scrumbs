import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { DashboardComponent } from "./dashboard/dashboard.component";
import { ProjectManagerModule } from "./project-manager/project-manager.module";

const routes: Routes = [

    // path: /dashboard
    {
        path: 'dashboard',
        component: DashboardComponent
    },
    //path: /projects
    {
        path: 'projects',
        loadChildren: () => import('./project-manager/project-manager.module').then(m => m.ProjectManagerModule)
    },
    //path: /admin
    
    // path: any
    {
        path: '**',
        redirectTo: 'login',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class ProtectedRoutingModule {}