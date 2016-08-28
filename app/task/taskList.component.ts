import {Task} from './task.class';
import {TaskService} from './task.service';
import {Component, OnInit} from '@angular/core';

const expirationTime: number = 1000 * 60 * 60 * 24 *2;//2天为到期提醒时间
@Component({
    moduleId: module.id,
    selector: 'agl-task-list',
    styleUrls: ['./taskList.component.css'],
    templateUrl: 'taskList.component.html'
})
export class TaskListComponent implements OnInit {
    currentDate: Date;
    list: Task[] = [

    ];
    constructor(private taskService:TaskService) {
        this.currentDate = new Date();
        this.taskService.getTasks().then(tasks=>{
             this.list=tasks;
             this.processListStatus();
        });
    }

    ngOnInit() { }
    trasferStatusCss(status) {
        return {
            '1': 'label-default',
            '2': 'label-danger',
            '3':'label-success'
        }[status]
    }
    private processListStatus(){
        this.list.forEach(task=>{
            if(task.status==='3'){//完成的状态不用处理
                return;
            }
            let taskTime = new Date(task.date);
            if((taskTime.getTime()-this.currentDate.getTime())<expirationTime && task.status==='1'){
                task.status='2';
            }
        });
    } 
    save() {
        console.log(this.list)
    }
}