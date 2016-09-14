import {TaskComponent} from './task.component';
import {TaskListComponent} from './taskList.component';
import {TaskStartComponent} from './taskStart.component';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'index/task',
  },
  {
    path:'index/task',
    component:TaskComponent,
    children:[
      { path: '', component: TaskStartComponent },
      { path: 'list', component: TaskListComponent }
    ]
  }
];

export const routing = RouterModule.forChild(routes);