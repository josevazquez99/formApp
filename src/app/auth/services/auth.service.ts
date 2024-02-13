import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { LoginResponse, User } from '../interfaces/interfaces';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl : string = "http://localhost:3000/auth"
  private _user !: User;

  get user() : User{
    return {...this._user};
  }

  constructor(private http: HttpClient, private router: Router) { }

  storageUser(resp:LoginResponse){
    localStorage.setItem("token",resp.token);
    this._user = resp.user
  }

  removeStorageUser(){
    localStorage.removeItem("token");
    this._user = {email: '',active:false,name:'',role:'',uid:'',username:''};
  }

  login(email:string, password:string):Observable<Boolean|String>{
    return this.http.post<LoginResponse>(`${this.baseUrl}/login`,{email,password})
    .pipe(
      tap(resp =>{
        this.storageUser(resp)
      }),
      map(resp => true),
      catchError(error => of(error.error.message))
    );
  }

  logout(){
    this.removeStorageUser();
    this.router.navigateByUrl("auth/login");
  }

  validateToken(){
    const url = "http://localhost:3000/renew";
    return this.http.get<LoginResponse>(url)
      .pipe(
        map( resp => {
          this.storageUser(resp)    
          return true;
        }),
        catchError(error => of(false))
      )
  }
}
