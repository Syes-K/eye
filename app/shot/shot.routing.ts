import { Routes, RouterModule } from '@angular/router';
import { ShotComponent } from './shot.component';
import {ShotBattleFieldComponent} from './shot.battlefield.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'battlefield',
  },
  {
    path:'',
    component:ShotComponent,
    children:[
      { path: 'battlefield', component: ShotBattleFieldComponent }
    ]
  }
];

export const routing = RouterModule.forChild(routes); 