import { Component, OnInit } from '@angular/core';
import { Report } from '../../_models/report'

@Component({
  selector: 'app-report-viewer',
  templateUrl: './report-viewer.component.html',
  styleUrls: ['./report-viewer.component.css']
})
export class ReportViewerComponent implements OnInit {

  title!: string;
  date!: number;
  public selectedReport: Report;

  constructor() {
    this.selectedReport= new Report('', '', '');
  }

  getReportInfo(t: string){
    this.selectedReport.title = t;
  }

  ngOnInit(): void {
  }

}
