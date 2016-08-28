import {TaskService} from './task.service';
import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'taskStatusText'
})
export class TaskStatusTextPipe implements PipeTransform {
      
    transform(value: any, args: any[]): any {
        return TaskService.TaskStatuses.find(i=>{
            return i.value==value;
        }).text;
    }
}