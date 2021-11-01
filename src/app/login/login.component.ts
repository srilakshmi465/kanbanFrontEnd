import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { RegistrationService } from '../registration.service';
import { ApiService } from '../Services/api.service';
import User from '../user';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user= new User() 
  
  profileForm: FormGroup;
  

  constructor(private apiService : ApiService, private _router : Router, private fb: FormBuilder) { 
    this.profileForm = this.fb.group({
      email: ['', Validators.compose([Validators.required])],
      password: ['', Validators.required]

    });
  }

  ngOnInit(): void {
    
  }

  public checkError = (controlName: string, errorName: string) => {
    return this.profileForm.controls[controlName].hasError(errorName);
  }

  loginUser(){
    console.log('Login details => ',this.profileForm.value);
    this.apiService.putService('/api/login/loginform/'+this.profileForm.value.email+'/'+this.profileForm.value.password, this.profileForm.value).subscribe(data=>{
        console.log("response received")
         this._router.navigateByUrl('/loginsuccess')
      }, error =>{
        console.log("exception occured",error);
      });

  }
    
    gotoregistration(){
      this._router. navigate(['/registration'])
      
     
     }

}
  
