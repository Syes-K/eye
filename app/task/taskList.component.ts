/// <reference path="../jquery.d.ts" />
import {Task} from './task.class';
import {TaskService} from './task.service';
import{TaskStatusOperateComponent} from './taskStatusOperate.component'
import {Component, OnInit} from '@angular/core';
import {FORM_DIRECTIVES} from '@angular/forms';


const expirationTime: number = 1000 * 60 * 60 * 24 * 2;//2天为到期提醒时间
@Component({
    moduleId: module.id,
    selector: 'agl-task-list',
    styleUrls: ['./taskList.component.css'],
    templateUrl: './taskList.component.html',
    directives: [FORM_DIRECTIVES,TaskStatusOperateComponent]
})
export class TaskListComponent implements OnInit {
    currentDate: Date;
    list: Task[] = [];
    constructor(private taskService: TaskService) {
        this.currentDate = new Date();
        this.taskService.getTasks().then(tasks => {
            this.list = tasks;
            this.processListStatus();
        });
    }

    ngOnInit() { }
    private processListStatus() {
        this.list.forEach(task => {
            if (task.status === '3') {//完成的状态不用处理
                return;
            }
            let taskTime = new Date(task.date);
            if ((taskTime.getTime() - this.currentDate.getTime()) < expirationTime && task.status === '1') {
                task.status = '2';
            }
        });
    }
  
    addTask() {
        let task = new Task();
        this.list.push(task);
    }
    save() {
        this.taskService.saveTasks(this.list).then(() => alert(1));
    }
}