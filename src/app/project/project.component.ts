import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ProjectService } from '../project.service';
import { MatDialog, MatDialogModule, MAT_DIALOG_DATA, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  
  
  id=Number;
  projectName=String;
   formControlName = new FormControl();
  form: FormGroup;
  //  dialogRef: any;
  ProjectService: any;

  constructor(
    private fb: FormBuilder,
      private dialogRef: MatDialogRef<ProjectComponent>,
    private project: ProjectService) { 

      this.form = fb.group({
        title: [this.projectName, Validators.required]
    });
    }

  ngOnInit() {
    
      this.form = new FormGroup({
       // projectName: new FormControl()
        
      });
    
  }

  close() {
    this.dialogRef.close();
  } 

  save() {
    // this.projectName = this.form.get('projectName').value;
    if (this.projectName) {
      this.ProjectService.saveNewKanban(this.projectName).subscribe(

        ( response: any) => {
          console.log(response)
        }
      )
    }
    this.dialogRef.close();
    window.location.reload();
  }

}
