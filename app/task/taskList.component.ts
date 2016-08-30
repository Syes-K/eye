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
    styles: [`
        .task-status{
        position:relative;
        cursor: pointer;
        }
        .task-status .task-status-icon{
            line-height: 32px;
        }

        @keyframes broadcast{
            0%{
                width: 16px;
                height:16px;
                margin-left:0; 
                margin-top:-8px; 
                opacity: 1;
            }
            10%{
                width: 32px;
                height:32px;
                margin-left:-8px;
                margin-top:-16px; 
                opacity: 0;
            }
            11%{
                width: 16px;
                height:16px;
                margin-left:0; 
                margin-top:-8px; 
                opacity: 0;
            }
            12%{
                width: 16px;
                height:16px;
                margin-left:0; 
                margin-top:-8px; 
                opacity: 1;
                }
            20%{width: 32px;
                height:32px;
                margin-left:-8px; 
                margin-top:-16px;  
                opacity: 0;}
            21%{
                width: 16px;
                height:16px;
                margin-left:0; 
                margin-top:-8px; 
                opacity: 0;}
            22%{
                width: 16px;
                height:16px;
                margin-left:0; 
                margin-top:-8px; 
                opacity: 1;}
            30%{
                width: 32px;
                height:32px;
                margin-left:-8px; 
                margin-top:-16px;  
                opacity: 0
            }
            31%{  
                width: 16px;
                height:16px;
                margin-left:0; 
                margin-top:-8px; 
                opacity: 0;
            }
            100%{   
                width: 16px;
                height:16px;
                margin-left:0; 
                margin-top:-8px; 
                opacity: 1;
            }
        }

        .task-status-icon.text-danger~.task-status-broadcast{
            position: absolute;
            top:50%;
            left:0;
            width: 16px;
            height:16px;
            margin-left:0; 
            margin-top:-8px; 

            border: 1px #a94442 solid;
            border-radius: 100%;
            animation: broadcast 12s;
            animation-iteration-count: infinite;
        }
        td textarea.form-control{
            height:34px;
            max-width:100%;
        }


        .table >tbody >tr > td.td-operate{
            padding: 0;
        }
        .table >tbody >tr > td.td-operate button.btn{
            border: none;
            border-radius: 0px;
        }
        .list-group{
            z-index: 10;
            position:absolute;
            top:100%;
            left:0;
            display: none;
                margin:0;
        }
        .task-status.active .list-group{
            display: block;
        }
       
        .list-group .list-group-item{
            padding: 6px 12px 6px 12px;
            cursor: pointer;
        }
    `],
    templateUrl:'taskStatusOperate.component.html',
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
    templateUrl: 'taskList.component.html',
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