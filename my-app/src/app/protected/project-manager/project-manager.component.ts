import { Component, OnInit } from '@angular/core';
import { Project, Projects, Task } from '../../models/project';
import { MatDialog } from '@angular/material/dialog';

import { AddTaskDialogComponent } from './dialogs/add-task-dialog.component'; //task dialog box
import { AddProjectDialogComponent } from './dialogs/add-project-dialog.component'; //project dialog box
import { OrchestrationService } from 'src/app/orchestration/orchestration.service';
import { Teams } from 'src/app/models/team';
import { User } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/security/authentication.service';
//import { FilterCompletedPipe, FilterInProgPipe, FilterNeedsApprovedPipe, FilterToDoPipe} from '../../pipes/filter-status.pipe'


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

    //currentUser: User;

    //projects
    projects: Project [] = [];


    //constructor(){
    constructor(public dialog: MatDialog, private orchestration: OrchestrationService) {
        this.isEng=true;
        this.isStake=false;
        this.selectedProj = {
          _id: '',
          title: '',
          description: '',
          taskList: []
        };
        this.getProjects();
    }

    ngOnInit(): void {
        
    }

    getProjInfo(n: string){
        this.selectedProj.title = n;
    }
    
    changeSelectedProject(project: Project){
      this.selectedProj = project;
      this.getProjectTasks(this.selectedProj._id);
      console.log("Current Proj", this.selectedProj);
    }

    updateTaskStatus(status: 'to-do' | 'in-prog' | 'needs-approved' | 'completed', task: Task){
      const taskId = task._id;
      task.status = status;
      this.orchestration.updateProjectTask(task, taskId).subscribe(data => {
        this.getProjectTasks(this.selectedProj._id);
        console.log(data);
      });
    }

    filterTaskStatus(status: 'to-do' | 'in-prog' | 'needs-approved' | 'completed'){
      return this.selectedProj.taskList?.filter(task => task.status === status);
    }

    addProjectTask(title: string, description: string){
      const task: Task = {
        _id: '',
        projectId: this.selectedProj._id,
        title: title,
        description: description,
        status: 'to-do'
      }

      return this.orchestration.createProjectTask(task).subscribe(data => {
        console.log('message', data);
        //refresh tasks
        this.getProjectTasks(this.selectedProj._id);
      });
    }

    openAddTaskDialog(): void { //dialog for adding tasks
      let dialogRef = this.dialog.open(AddTaskDialogComponent, {
        width: '250px',
        data: { projTitle: this.selectedProj.title }
      });
    
      dialogRef.afterClosed().subscribe(result => {
        console.log(result);
        if(result.title && result.description){
          this.addProjectTask(result.title, result.description);
        }
      });
    }

    openAddProjectDialog(): void { //dialog for adding tasks
      let dialogRef = this.dialog.open(AddProjectDialogComponent, {
        width: '250px',
        data: { projTitle: this.selectedProj.title }
      });
    
      dialogRef.afterClosed().subscribe(result => {
        if(result.title && result.description){
          this.createProject(result.title, result.description);
        }
      });
    }

    getProjects(){
      this.orchestration.readAllProjects().subscribe(data => {
        this.projects = data.projects;
        console.log(this.projects);
      });
    }

    getProjectTasks(id: string){
      this.orchestration.readAllProjectTasks(id).subscribe(data => {
        this.selectedProj.taskList = data.project_tasks;
        console.log(this.selectedProj.taskList);
      });
    }

    createProject(title: string, description: string){
      const project = {
        title: title,
        description: description,
      }
      console.log(project);

      return this.orchestration.createProject(project).subscribe(data => {
        console.log('message', data);
        //refresh projects
        this.getProjects();
      });

    }
}
