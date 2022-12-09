//report info model
/* export class Report {
    title!: string;
    date!: string;
    data!: string;
    
    constructor(t: string, d1: string, d2: string){
        this.title=t;
        this.date=d1;
        this.data=d2;
    }
} */

export class TaskReportItem {
    public constructor(init: Partial<TaskReportItem>) {
        Object.assign(this, init);
    }

    public value!: number;
    public category!: string;
    public summary!: string;

}
export class TaskReport extends Array<TaskReportItem> {
    public constructor(data: Array<ChartItem>) {
        super();
        for(const i of data){
            this.push(new TaskReportItem(
                {
                    value: i.value,
                    category: i.status,
                    summary: i.summary
                }));
        }
        
    }
}
interface ChartItem {
    value: number;
    status: string;
    summary: string;
  }