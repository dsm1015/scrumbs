import {Component} from '@angular/core';

export interface LogAttributes {
  date: number;
  type: string;
  message: string;
}
  
export class Log {
    displayedColumns: string[] = ['date', 'type', 'message'];
    dataSource: LogAttributes[] = [];
  }