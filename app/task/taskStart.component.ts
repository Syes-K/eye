import {AppService,GlobalOperateEventArgs} from '../app.service';
import { Component, OnInit } from '@angular/core';


@Component({
    moduleId: module.id,
    selector: 'agl-task-start',
    template: '<img style="width:100%" src="/app/task/IMg_0160.JPG" alt="">'
})
export class TaskStartComponent implements OnInit {
    constructor(private appService:AppService) { 
        this.appService.globalOperateEvents.subscribe((e:GlobalOperateEventArgs)=>{
            console.log('启动页global事件');       
        });
    }

    ngOnInit() { }
}