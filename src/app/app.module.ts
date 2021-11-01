import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormControlName, FormGroup, FormGroupName, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { HttpClientModule } from '@angular/common/http';
import { CreateProject, LoginsuccessComponent } from './loginsuccess/loginsuccess.component';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatDialogModule } from '@angular/material/dialog';
//import { MatFormFieldModule, MatInputModule } from "@angular/material";
import {MatFormFieldModule} from '@angular/material/form-field';
import { ProjectComponent } from './project/project.component';
import { CreateTask, ModifyTask, TaskComponent } from './task/task.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';

@NgModule({
  entryComponents:[
    CreateProject,
    CreateTask,
    ModifyTask
  ],

  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    LoginsuccessComponent,
    ProjectComponent,
    TaskComponent,
    CreateProject,
    CreateTask,
    ModifyTask
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    DragDropModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatSelectModule
    
    
    

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
