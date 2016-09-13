import { Injectable, EventEmitter } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
export class GlobalOperateEventArgs {
    constructor(public eventName: string) { };
}
export class GlobalOperateObservableArgs {
    public get eventName(): string {
        return this._eventName;
    }
    public get element(): any {
        return this._element;
    }
    public get args(): any {
        return this._args;
    }
    public get emitter(): string {
        return this._emitter;
    }
    constructor(
        private _eventName: string,
        private _emitter: string,
        private _element: any,
        private _args: any
    ) {
    }
}

export class GlobalOperateSubjectArgs {
    public get eventName(): string {
        return this._eventName;
    }
    public get element(): any {
        return this._element;
    }
    public get args(): any {
        return this._args;
    }
    public get emitter(): string {
        return this._emitter;
    }
    constructor(
        private _eventName: string,
        private _emitter: string,
        private _element: any,
        private _args: any
    ) {
    }
}

@Injectable()
export class AppService {
    public globalOperateEvents: EventEmitter<GlobalOperateEventArgs> = new EventEmitter<GlobalOperateEventArgs>();
    public globalOperateObservable: { [index: string]: Observable<GlobalOperateObservableArgs> } = {};
    public globalOperateSubject: { [index: string]: Subject<GlobalOperateSubjectArgs> } = {};
    constructor() {
        this.globalOperateSubject['globalInit'] =  new Subject<GlobalOperateSubjectArgs>();
    }
}
