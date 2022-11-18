//report info model
export class Report {
    title!: string;
    date!: string;
    data!: string;
    
    constructor(t: string, d1: string, d2: string){
        this.title=t;
        this.date=d1;
        this.data=d2;
    }
}