import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TaskComponent } from './components/task.component';
import { TaskFormComponent } from './components/taskForm.component';
import { CategoryComponent } from './components/category.component';
import { TaskBilanComponent } from './components/taskBilan.component';

export const routes: Routes = [
    {
        path: '',
        component: TaskComponent
    },
    {
        path: 'category',
        component: CategoryComponent
    },
    {
      path: 'task',
      component: TaskFormComponent
    },
    {
      path: 'sheet',
      component: TaskBilanComponent
    },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
