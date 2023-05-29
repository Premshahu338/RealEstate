import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  basepath ="http://localhost:4000"
  sidebar: boolean = true

  constructor(private http: HttpClient, public router: Router) { 
    const token = sessionStorage.getItem('token')

  }

  postUnauthenticateData(url: any, req: any) {
    return this.http.post(url, req)
  }


  getUnAuthenticateData(url:any){
    return this.http.get(url)
  }
}
