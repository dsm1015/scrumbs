//project info model
export class Project {
    name!: string;
    description!: string;
    task?: string;
    taskList?: [];
    
    constructor(n: string, d: string){
        this.name=n;
        this.description=d;
        
    }
}

export class Task {
    title!: string;
    description!: string;
    status!: 'to-do' | 'in-prog' | 'needs-approval' | 'completed';
}
