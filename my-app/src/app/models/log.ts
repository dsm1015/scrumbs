import {Component} from '@angular/core';

export interface LogAttributes {
  timestamp: Date | null;
  level: string;
  message: string;
}

export interface Logs {
  logs: LogAttributes [];
}
  
export class Log {
    displayedColumns: string[] = ['timestamp', 'level', 'message'];
    dataSource: LogAttributes[] = [];
  }