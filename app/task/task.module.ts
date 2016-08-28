import {TaskComponent} from './task.component';
import {routing} from './task.routing';
import {TaskService} from './task.service';
import {TaskStatusTextPipe} from './task.status.pipe';
import {TaskStartComponent} from './taskStart.component';
import {TaskListComponent} from './taskList.component';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms/src/form_providers';
import {BrowserModule} from '@angular/platform-browser';

@NgModule({
    imports: [BrowserModule, FormsModule, routing],
    exports: [TaskComponent],
    declarations: [TaskComponent, TaskListComponent,TaskStartComponent, TaskStatusTextPipe],
    providers: [TaskService],
})
export class TaskModule { }
