import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {routing} from './shot.routing';
import { ShotComponent }   from './shot.component';
import {ShotBattleFieldComponent} from './shot.battlefield.component';
import {ShotPlayerComponent} from './shot.player.component';

@NgModule({
    imports: [BrowserModule, FormsModule, routing],
    exports: [],
    declarations: [ShotComponent, ShotBattleFieldComponent,ShotPlayerComponent],
    providers: [],
})
export class ShotModule { }
