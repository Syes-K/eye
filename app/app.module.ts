import {AppService} from './app.service';
import {TaskModule} from './task/task.module';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {routing} from './app.routing';

import {CommonModule} from './common/common.module';
import {TaskComponent} from './task/task.component';

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        CommonModule,
        TaskModule,
        routing,
    ],
    declarations: [AppComponent],
    providers: [AppService],
    bootstrap: [AppComponent],
})
export class AppModule { }
