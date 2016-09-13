import {AppService, GlobalOperateEventArgs, GlobalOperateObservableArgs, GlobalOperateSubjectArgs} from '../app.service';
import {TaskStatusOperateComponent} from './taskStatusOperate.component';
import {Task} from './task.class';
import {TaskService} from './task.service';
import {Component, OnInit, OnDestroy} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';
import 'rxjs/add/operator/debounceTime';
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
    private globalInitSubscription: Subscription;
    private globalEventHandlers: Subscription;
    private globalSaveSubscription: Subscription;
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
    constructor(private taskService: TaskService, private appService: AppService) {
        this.globalInitSubscription = this.appService.globalOperateSubject['globalInit'].subscribe((e: GlobalOperateSubjectArgs) => {
            this.initSearchCondition();
            this.initList();
            console.log(e);
        });

        this.globalEventHandlers = this.appService.globalOperateEvents
            .asObservable().debounceTime(200)
            .subscribe((e: GlobalOperateEventArgs) => {
                switch (e.eventName) {
                    case 'new':
                        this.addTask();
                        break;
                    default:
                        break;
                }
            });
        this.globalSaveSubscription = this.appService.globalOperateObservable["globalSave"]
            .debounceTime(200)
            .subscribe((args) => {
                console.log(args);
                this.save();
            });
        this.currentDate = new Date();
        this.initList();
    }

    ngOnInit(): void { }
    ngOnDestroy(): void {
        this.globalInitSubscription.unsubscribe();
        this.globalEventHandlers.unsubscribe();
        this.globalSaveSubscription.unsubscribe();
    }

    private initSearchCondition(){
            this.currentSearchCondition = this.searchConditions[4]
            this.taskSearchKey = '1,2';
    }

    private processListStatus(): void {
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

    private initList(): void {
        this.taskService.getTasks().then(tasks => {
            this.list = tasks;
            this.processListStatus();
            this.newList = [];
        });
    }

    private selectSearchCondition(searchCondition: any, taskSearchKeyControl: HTMLInputElement): void {
        this.currentSearchCondition = searchCondition;
        this.taskSearchKey = '';
        taskSearchKeyControl.focus();
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