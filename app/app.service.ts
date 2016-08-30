import { Injectable,EventEmitter } from '@angular/core';

@Injectable()
export class AppService {
    globalOperateEvents:EventEmitter<any>= new EventEmitter();
    constructor() { }
}