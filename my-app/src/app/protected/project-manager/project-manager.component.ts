import { Component, OnInit } from '@angular/core';
import { Project, Task } from '../../_models/project';
import { MatDialog } from '@angular/material/dialog'; //new

import { ProjectDialogComponent } from './project-dialog.component'; //new


@Component({
    selector: 'app-project-manager',
    templateUrl: './project-manager.component.html',
    styleUrls: ['./project-manager.component.css']
})

export class ProjectManagerComponent implements OnInit {
    //user var
    public isEng: boolean;
    public isStake: boolean;
    public selectedProj: Project;

    //task var
    title!: string;
    description!: string;


    //constructor(){
    constructor(public dialog: MatDialog) {
        this.isEng=true;
        this.isStake=false;
        this.selectedProj= new Project('', '');
    }

    ngOnInit(): void {
        
    }

    getProjInfo(n: string){
        this.selectedProj.name = n;
    }

    addTask(){

    }

    openDialog(): void { //dialog for adding tasks
      let dialogRef = this.dialog.open(ProjectDialogComponent, {
        width: '250px',
        data: { t: this.title, d: this.description }
      });
    
      dialogRef.afterClosed().subscribe(result => {
        this.title = result;
      });
    }
}
