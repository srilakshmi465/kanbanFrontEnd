import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ProjectService } from '../project.service';
import { MatDialog, MatDialogModule, MAT_DIALOG_DATA, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from '../Services/api.service';
import { TaskService } from '../Services/task.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Router } from '@angular/router';


@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent {
  
  taskList: any[]=[];
  todos: any[]=[];
  inprogress: any=[];
  dones: any=[];
  constructor(private apiService: ApiService,private dialog: MatDialog, private router: Router) { }

  ngOnInit(): void {
    //this.getProjectName();

    this.getTaskList();
  }

  getTaskList(){
    this.apiService.getService('/task/taskList').subscribe(data=>{
      console.log('Project name list=> ',data.body);
      this.taskList = data.body;
      this.todos = this.taskList.filter(tl=>tl.status=== "TODO");
      this.inprogress = this.taskList.filter(tl=>tl.status==="INPROGRESS");
      this.dones = this.taskList.filter(tl=>tl.status==="DONE");
    });
  }

  getProjectName(){
    this.apiService.getService('/project/getProjectName').subscribe(data=>{
      console.log('Project name list=> ',data.body);
    });
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(CreateTask, { width: "400px"});
    dialogRef.afterClosed().subscribe(result => {
      
    });
  }
  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      this.updateTaskStatusAfterDragDrop(event);
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }
  task: any;
  private updateTaskStatusAfterDragDrop(event: CdkDragDrop<string[], string[]>) {

    let taskId = event.item.element.nativeElement.id;
    let containerId = event.container.id;
    // for(let i = 0; i < this.taskList.length; i++){
    //   if(this.taskList[i].id === taskId) {
    //     this.task = this.taskList[i];
    //   }
    // }

    //this.updateTaskStatus(this.task, containerId);
    this.apiService.getService('/task/getById/'+taskId).subscribe(
        response => {
          console.log("Task by id=>",response.body);
          this.updateTaskStatus(response.body, containerId);
        }
    );
  }

  private updateTaskStatus(task: any, containerId: string): void {
    console.log('Task for drop update: ',task);
    if (containerId === 'todo'){
      task.status = 'TODO'
    } else if (containerId === 'inpro'){
      task.status = 'INPROGRESS'
    } else {
      task.status = 'DONE'
    }

    console.log('Task for final update: ',task);
    this.apiService.putService('/task/updateTask',task).subscribe(data=>{
      if(data.status===200){
        console.log("Task update succefully");
        // this.router.navigateByUrl('/', {skipLocationChange: true})
      // .then(() => this.router.navigate(['/task']));
      }else{
        console.log("updated");
      }
    });
    
  }
  openTaskDialog(event:any): void {
    let taskId = event.srcElement.id;
    // let taskId = event.item.element.nativeElement.id;
    const dialogRef = this.dialog.open(ModifyTask,{ width: "1040px", panelClass: 'custom-dialog-container', data: taskId });
    dialogRef.afterClosed().subscribe(result => { 
      this.getTaskList();
    });
  }


}
 

 

@Component({
  selector: 'create_task',
  templateUrl: 'create-task.html',
  providers:[TaskComponent]
})
export class CreateTask implements OnInit{
    task:any;
    id:any;
	  title:any;
	  status:any;
	  description:any;
    statusList = [
      {value: 'TODO', viewValue: 'TODO'},
      {value: 'INPROGRESS', viewValue: 'INPROGRESS'},
      {value: 'DONE', viewValue: 'DONE'}
    ];

  constructor(private taskservice: TaskService, public dialogRef: MatDialogRef<CreateTask>){}

  ngOnInit(){
    
    this.task={title: null, status: null, description:null};
  }

  saveTask(reqData:any, status: string){
    if(status=='save'){
      this.taskservice.postService('/task/createTask', reqData).subscribe(data=>{
        if(data.status === 200){
          console.log("Task created succefully.");
          this.dialogRef.close();
          // this.route.navigate(['/task']);
  
        }else{
          console.log("Task created error.");
          this.dialogRef.close();
        }
      });
    }else{
      this.dialogRef.close();
    }
    
  }

  
  
}

@Component({
  selector: 'modify_task',                                    //Use For Modify Club Account Details open dialog Button
  templateUrl: 'modify-task.html'
})
export class ModifyTask {

  task:any;
  taskId: any;
  statusList = [
    {value: 'TODO', viewValue: 'TODO'},
    {value: 'INPROGRESS', viewValue: 'INPROGRESS'},
    {value: 'DONE', viewValue: 'DONE'}
  ];
  constructor(public dialogRef: MatDialogRef<ModifyTask>, private apiService: ApiService, @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {
    this.task={title: null, status: null, description:null};
  }

  ngOnInit() {
    
    this.taskId = this.data;
    this.apiService.getService('/task/getById/'+this.taskId).subscribe(data=>{
      this.task = data.body;
    });
  }

  saveTask(reqData:any, status: string){
    if(status=='update'){
      this.apiService.putService('/task/updateTask', reqData).subscribe(data=>{
        if(data.status === 200){
          console.log("Task updated succefully.");
          this.dialogRef.close();
          // this.route.navigate(['/task']);
  
        }else{
          console.log("Task updated error.");
          this.dialogRef.close();
        }
      });
    }else if(status=='delete'){
      this.apiService.putService('/task/deleteTaskById', reqData).subscribe(data=>{
        if(data.status === 200){
          console.log("Task deleted succefully.");
          this.dialogRef.close();
          // this.route.navigate(['/task']);
  
        }else{
          console.log("Task deleted error.");
          this.dialogRef.close();
        }
      });
    }else{
      this.dialogRef.close();
    }
    
  }


}