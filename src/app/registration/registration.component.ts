import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegistrationService } from '../registration.service';
import { ApiService } from '../Services/api.service';
import User from '../user';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  user=new User();
  regForm: FormGroup;
  constructor(private apiService: ApiService, private _router : Router, private fb: FormBuilder) {
    this.regForm = this.fb.group({
      email: ['', Validators.compose([Validators.required])],
      userName: ['', Validators.compose([Validators.required])],
      password: ['', Validators.required],
      cpassword: ['', Validators.compose([Validators.required])]

    });
   }
 
  ngOnInit(): void {
  }
  public checkError = (controlName: string, errorName: string) => {
    return this.regForm.controls[controlName].hasError(errorName);
  }

 registerUser(){
   this.apiService.postService('/api/login/registration', this.regForm.value).subscribe(data=>{
     
       console.log("response received");
       this._router.navigateByUrl('/login')
     },
     error=>{
       console.log("exception occured");
       
     }
   )
 }
}
