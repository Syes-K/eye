/**
 * Created by yongsheng.kuang on 16/9/14.
 */
import {Component, Input, OnInit, OnDestroy, AfterViewInit, ElementRef} from '@angular/core';
import {DomSanitizationService, SafeStyle} from '@angular/platform-browser';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/debounceTime';

const playerOperateKey: string[] = ['a', 'w', 'd', 's'];

@Component({
    moduleId: module.id,
    selector: 'agl-shot-player',
    styleUrls: ['shot.player.component.css'],
    template: `
        <div class="shot-player" 
                [class.grant-showing]="initTime"
                [style.width]="width+'px'" 
                [style.height]="height+'px'"
                [style.left]="offsetLeft+'px'">
            <img src="app/shot/icon/plane.ico" 
                [style.transform]="imgTransform" alt="">
        </div>
    `
})
export class ShotPlayerComponent implements OnInit,OnDestroy,AfterViewInit {
    private state: 'init'|'battle' = 'init';
    private width: number = 32;
    private height: number = 32;
    private offsetLeft: number = 0;
    private initTime: boolean = false;
    private rotateZObservable: Observable<number>;
    private rotateZSubscription: Subscription;
    private keyBoardObservable: Observable<KeyboardEvent>;
    private keyBoardSubscription: Subscription;
    private rotateZ: number;
    private imgTransform: SafeStyle;
    @Input()
    private battleSize: {width: number,height: number};

    constructor(private elementRef: ElementRef, private sanitizer: DomSanitizationService) {
        console.log(this.elementRef);
    }

    ngOnInit() {
        this.offsetLeft = (this.battleSize.width - this.width) / 2;
        this.keyBoardObservable = Observable.fromEvent(document, 'keypress') as Observable<KeyboardEvent>;
        this.keyBoardSubscription = this.keyBoardObservable
            .filter((keyEvent: KeyboardEvent)=> {
                return playerOperateKey.some(k=>k === keyEvent.key);
            })
            .debounceTime(50)
            .subscribe(keyEvent=> {
                switch(keyEvent.key) {
                    case 'a':
                        this.leftMove();
                        break;
                    case 'd':
                        this.rightMove();
                        break;
                    case 'w':
                        this.shot();
                        break;
                    default:
                        break;

                }
            });
    }

    ngAfterViewInit() {
        setTimeout(()=> {
            this.initTime = true;
        }, 100);
        setTimeout(()=> {
            this.state = 'battle';
            this.initTime = false;
            this.rotateZObservable = Observable.interval(50).scan((deg: number)=> {
                let nextDeg = (deg + 5) % 360;
                return nextDeg;
            });
            this.rotateZSubscription = this.rotateZObservable.subscribe((deg: number)=> {
                this.rotateZ = deg;
                this.imgTransform = this.sanitizer.bypassSecurityTrustStyle('rotateZ(' + this.rotateZ + 'deg)');
            });
        }, 2300);
    }

    ngOnDestroy() {
        this.rotateZSubscription.unsubscribe();
        this.keyBoardSubscription.unsubscribe();
    }

    private leftMove(): void {
        if(this.offsetLeft<=0){
            return;
        }
        this.offsetLeft -= this.width/2;
    }

    private rightMove(): void {
        if(this.offsetLeft>=(this.battleSize.width-this.width)){
            return;
        }
        this.offsetLeft += this.width/2;
    }
    private shot():void{
        console.log({
            left:this.offsetLeft,
            direct:(this.rotateZ+90)%360
        })
    }
}