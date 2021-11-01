import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ApiService } from '../Services/api.service';


@Component({
  selector: 'app-loginsuccess',
  templateUrl: './loginsuccess.component.html',
  styleUrls: ['./loginsuccess.component.css']
})
export class LoginsuccessComponent implements OnInit {
  
  title = 'Angular 7';
  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(CreateProject, { width: "1000px"});
    dialogRef.afterClosed().subscribe(result => {
      
    });
  }
   
  
}


@Component({
  selector: 'create_project',
  templateUrl: 'create-project.html',
  providers:[LoginsuccessComponent]
})
export class CreateProject  implements OnInit {
 
  project:any;

  constructor(private apiService: ApiService, public dialogRef: MatDialogRef<CreateProject>, private route: Router){}

  ngOnInit(){
    
    this.project = {projectId: null,projectName: null};
  }

  saveProject(reqData:any, status: string){
    if(status=='save'){
      this.apiService.postService('/project/createproject', reqData).subscribe(data=>{
        if(data.status === 200){
          console.log("Project created succefully.");
          this.dialogRef.close();
          this.route.navigate(['/task']);
  
        }else{
          console.log("Project created error.");
          this.dialogRef.close();
        }
      });
    }else{
      this.dialogRef.close();
    }
    
  }

  
  
}