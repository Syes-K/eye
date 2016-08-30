/// <reference path="../jquery.d.ts" />
import {Task} from './task.class';
import {TaskService} from './task.service';
import {Component, OnInit,forwardRef} from '@angular/core';
import {NG_VALUE_ACCESSOR,ControlValueAccessor,FORM_DIRECTIVES} from '@angular/forms';
const noop = () => {
};
export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => TaskStatusOperateComponent),
    multi: true
};
@Component({
    moduleId: module.id,
    selector: 'agl-task-list-status-operate',
    styleUrls:['./taskStatusOperate.component.css'],
    templateUrl:'./taskStatusOperate.component.html',
    providers:[CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
}) class TaskStatusOperateComponent implements ControlValueAccessor {
    private innerValue: any = '';
    statusList;
    constructor() {
        this.statusList = TaskService.TaskStatuses;
    }
    trasferStatusCss(status) {
        return {
            '1': 'text-default glyphicon-info-sign',
            '2': 'text-danger glyphicon-exclamation-sign',
            '3': 'text-success glyphicon-ok-sign'
        }[status]
    }
    selectStatus(status) {
         this.value = status; 
    }

    //Placeholders for the callbacks which are later providesd
    //by the Control Value Accessor
    private onTouchedCallback: () => void = noop;
    private onChangeCallback: (_: any) => void = noop;

    get value(): any {
        return this.innerValue;
    }
    set value(v: any) {
        if (v !== this.innerValue) {
            this.innerValue = v;
            this.onChangeCallback(v);
        }
    }
    
    //From ControlValueAccessor interface
    writeValue(value: any) {
        if (value !== this.innerValue) {
            this.innerValue = value;
        }
    }
    //From ControlValueAccessor interface
    registerOnChange(fn: any) {
        this.onChangeCallback = fn;
    }

    //From ControlValueAccessor interface
    registerOnTouched(fn: any) {
        this.onTouchedCallback = fn;
    }
}

const expirationTime: number = 1000 * 60 * 60 * 24 * 2;//2天为到期提醒时间
@Component({
    moduleId: module.id,
    selector: 'agl-task-list',
    styleUrls: ['./taskList.component.css'],
    templateUrl: './taskList.component.html',
    directives: [TaskStatusOperateComponent,FORM_DIRECTIVES]
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