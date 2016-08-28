import {AppComponent} from './app.component';
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
  }
];

export const routing = RouterModule.forRoot(routes);
