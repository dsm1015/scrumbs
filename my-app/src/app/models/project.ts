import { Teams } from "./team";

//project info model
export class Project {
    _id!: string;
    title!: string;
    description!: string;
    taskList: Task[] = [];
    teams?: Teams[];
    
    constructor(n: string, d: string){
        this.title=n;
        this.description=d;
        
    }
}

export class Projects {
    projects: Project [] = [];
}

export class Task {
    _id!: string;
    projectId!: string;
    title!: string;
    description!: string;
    status!: 'to-do' | 'in-prog' | 'needs-approved' | 'completed';
}

export class Tasks {
    project_tasks: Task [] = [];
}
