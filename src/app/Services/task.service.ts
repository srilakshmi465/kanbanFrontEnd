import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import {Observable} from "rxjs/index";


@Injectable({
  providedIn: 'root'
})
export class TaskService {
  
    baseUrl:string = 'http://localhost:8082';
    constructor(private http: HttpClient) { 
 
  }
 
  headers:any = new HttpHeaders({
    
  });

  getService(url:String) : Observable<HttpResponse<any>> {
    return this.http.get<any>(this.baseUrl +''+ url, {headers: this.headers, observe: 'response' });
  }
  
  postService(url:String,data: any): Observable<HttpResponse<any>> {
    return this.http.post(this.baseUrl+''+url,data,{headers: this.headers, observe: 'response' });
  }

  putService(url:String,data:any): Observable<HttpResponse<any>> {
    return this.http.put<any>(this.baseUrl+''+url, data,{headers: this.headers, observe: 'response' });
  }

}
