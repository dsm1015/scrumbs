import { Component, OnInit, ViewChild } from '@angular/core';
import { TaskReport } from '../../models/report'
import { IgxItemLegendComponent, IgxPieChartComponent, ItemHighlightFrameRect } from 'igniteui-angular-charts';
import { Project } from 'src/app/models/project';
import { OrchestrationService } from 'src/app/orchestration/orchestration.service';

@Component({
  selector: 'app-report-viewer',
  templateUrl: './report-viewer.component.html',
  styleUrls: ['./report-viewer.component.css']
})
export class ReportViewerComponent implements OnInit {

  @ViewChild("legend", { static: true } )
  public legend!: IgxItemLegendComponent;

  @ViewChild("chart", { static: true } )
  public chart!: IgxPieChartComponent;

  public selectedProject!: Project;
  public projects: Project[] = [];
  public data: ChartItem [] = [];

  public taskReport!: TaskReport;
  public lineChartData: LineChartItem [] = [];
  public noOfDays: string = '15';
  public today = new Date(Date.now()).toJSON().slice(0, 10);

  title!: string;
  date!: number;

  constructor(private orchestration: OrchestrationService) {
    this.getProjects();
  }

  ngOnInit(): void {
    
  }

  getProjects(){
    this.orchestration.readAllProjects().subscribe(data => {
      this.projects = data.projects;
      console.log(this.projects);
    });
  }

  selectReport(project: Project){ 
    this.selectedProject = project;
    this.getProjectTasks(this.selectedProject._id);
    console.log("Current Proj", this.selectedProject);
  }

  getProjectTasks(id: string){
    this.orchestration.readAllProjectTasks(id).subscribe(data => {
      this.selectedProject.taskList = data.project_tasks;
      this.fillPieData();
      this.fillLineData();
    });
  }

  fillPieData(){
    if(this.selectedProject.taskList){
      const data: ChartItem [] = [];
      const inprog = this.selectedProject.taskList.filter((task) => task.status === "in-prog");
      const needsappr = this.selectedProject.taskList.filter((task) => task.status === "needs-approved");
      const todo = this.selectedProject.taskList.filter((task) => task.status === "to-do");
      const completed = this.selectedProject.taskList.filter((task) => task.status === "completed");
      console.log(inprog.length, todo.length, needsappr.length, completed.length);
      const total = inprog.length+ todo.length+ needsappr.length+ completed.length
    
      const todoItem: ChartItem = {
        value: todo.length,
        status: "To Do",
        summary: "To Do " + ((todo.length/total*100).toFixed(2)) + "%"
      }
      data.push(todoItem);
      const inprogItem: ChartItem = {
        value: inprog.length,
        status: "In Progress",
        summary: "In Progress " + ((inprog.length/total*100).toFixed(2)) + "%"
      }
      data.push(inprogItem);
      const needsapprItem: ChartItem = {
        value: needsappr.length,
        status: "Needs Approved",
        summary: "Needs Approved " + ((needsappr.length/total*100).toFixed(2)) + "%"
      }
      data.push(needsapprItem);
      const completedItem: ChartItem = {
        value: completed.length,
        status: "Completed",
        summary: "Completed " + ((completed.length/total*100).toFixed(2)) + "%"
      }
      data.push(completedItem);
      
      this.data = data;
      this.taskReport = new TaskReport(data);
      console.log(this.taskReport);
    }
  }
  fillLineData(){
    if(this.selectedProject.taskList){
      const noOfDays = Number(this.noOfDays);
      const data: LineChartItem [] = [];
      const temp: any[] = [];
      const inprog = this.selectedProject.taskList.filter((task) => task.status === "in-prog");
      const needsappr = this.selectedProject.taskList.filter((task) => task.status === "needs-approved");
      const todo = this.selectedProject.taskList.filter((task) => task.status === "to-do");
      const completed = this.selectedProject.taskList.filter((task) => task.status === "completed");

      temp.push(inprog, needsappr,todo,completed)

      console.log(inprog);
      //create last two weeks and fill data
      const currTime = new Date(Date.now());

      var tempTime: Date = currTime;
      for(var i = 0; i<noOfDays; i++){
        var counts: number[] = [0,0,0,0];
        for(var item of temp){
          for(var task of item){
            const date: string = task.createdAt;
            const dateConvert = new Date(date);
            const end = new Date(tempTime.getTime());
            end.setDate(tempTime.getDate()-1);
            if((dateConvert <= tempTime && dateConvert >= end)){
              console.log(task.title, end, " <= ", dateConvert, " <= ", tempTime  );
              if(task.status === "to-do"){
                counts[0]++;
              } else if(task.status === "in-prog"){
                counts[1]++;
              } else if(task.status === "needs-approved"){
                counts[2]++;
              } else if(task.status === "completed"){
                counts[3]++;
              }
            }
          }
        }
        const newEntry: LineChartItem = {
          day: tempTime.toDateString(),
          todo: counts[0],
          inprog: counts[1],
          needsappr: counts[2],
          completed: counts[3]
        }
        data.push(newEntry);
        tempTime.setDate(tempTime.getDate() - 1);
      }
      console.log(data);
      this.lineChartData = data.reverse();
    }
  }

  changeRange(num: string){
    this.noOfDays = num; 
    this.fillLineData();
  }

}

interface ChartItem {
  value: number;
  status: string;
  summary: string;
}

interface LineChartItem {
  day: string;
  todo: number;
  inprog: number;
  needsappr: number;
  completed: number;
}
