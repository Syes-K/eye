import {TaskComponent} from './task/task.component';
import {RouterModule, Routes} from '@angular/router';


export const routes: Routes = [
  {
    path: 'index',
    pathMatch: 'full',
    redirectTo: 'index/task',
  },
  { 
    path: 'index/task', 
    component: TaskComponent
  },
   {path:'index/shot',loadChildren:'app/shot/shot.module#ShotModule'}
];

export const routing = RouterModule.forRoot(routes);
