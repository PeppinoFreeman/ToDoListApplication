// MODULES
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';

/// SERVICES
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CategoryService } from './services/category.service';
import { CategoryHttpService } from './services/categoryHttp.service';
import { TaskService } from './services/task.service';
import { TaskEditService } from './services/taskEdit.service';
import { TaskDelayService } from './services/taskDelay.service';
import { TaskFormService } from './services/taskForm.service';
import { TaskBilanService } from './services/taskBilan.service';

/// COMPONENTS
import { AppComponent } from './app.component';
import { CategoryComponent } from './components/category.component';
import { TaskComponent } from './components/task.component';
import { TaskFormComponent } from './components/taskForm.component';
import { TaskListComponent } from './components/taskList.component';
import { TaskBilanComponent } from './components/taskBilan.component';

@NgModule({
  declarations: [
    AppComponent,
    CategoryComponent,
    TaskComponent,
    TaskFormComponent,
    TaskListComponent,
    TaskBilanComponent,
  ],
  imports: [BrowserModule, HttpClientModule, FormsModule, AppRoutingModule],
  providers: [
    HttpClient,
    CategoryService,
    CategoryHttpService,
    TaskService,
    TaskDelayService,
    TaskEditService,
    TaskFormService,
    TaskBilanService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
