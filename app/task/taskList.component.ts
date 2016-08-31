import {TaskStatusOperateComponent} from './taskStatusOperate.component';
import {Task} from './task.class';
import {TaskService} from './task.service';
import {Component, OnInit} from '@angular/core';
//2天为到期提醒时间
//状态为1(new)的task 到期后自动转化为2(process)
const expirationTime: number = 1000 * 60 * 60 * 24 * 2;
@Component({
    moduleId: module.id,
    selector: 'agl-task-list',
    styleUrls: ['./taskList.component.css'],
    templateUrl: './taskList.component.html',
    directives: [TaskStatusOperateComponent]
})
export class TaskListComponent implements OnInit {
    private currentDate: Date;
    private list: Task[] = [];
    private newList: Task[] = [];
    private searchConditions: any[] = [
        { key: 'refNo', text: 'Ref No' },
        { key: 'desc', text: 'Desc' },
        { key: 'date', text: 'Date' },
        { key: 'note', text: 'Note' },
        { key: 'status', text: 'Status' }
    ];//搜索条件集合
    private currentSearchCondition: any = this.searchConditions[4];//档前搜索条件
    private taskSearchKey: string = '1,2';//当前搜索条件的value 1 或者 2
    constructor(private taskService: TaskService) {
        this.currentDate = new Date();
        this.initList();
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

    private initList() {
        this.taskService.getTasks().then(tasks => {
            this.list = tasks;
            this.processListStatus();
            this.newList = [];
        });
    }

    private selectSearchCondition(searchCondition, taskSearchKeyControl) {
        this.currentSearchCondition = searchCondition; 
        this.taskSearchKey = ''; 
        taskSearchKeyControl.focus()
    }

    private addTask(): void {
        let task = new Task();
        this.newList.push(task);
    }
    private delTask(task: Task): void {
        this.newList.splice(this.newList.indexOf(task), 1);
    }
    private save(): void {
        this.taskService.saveTasks(this.list.concat(this.newList)).then(() => {
            this.initList()
        });
    }
}