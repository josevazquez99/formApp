import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User, UserPut } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private baseUrl : string = "http://localhost:3000/usuario"

  constructor(private http: HttpClient) { }


  getUsers():Observable<User[]>{
    return this.http.get<User[]>(this.baseUrl);
  }

  delete(id:string):Observable<User>{
    return this.http.delete<User>(`${this.baseUrl}/${id}`);
  }

  update(user:UserPut):Observable<User>{
    return this.http.put<User>(`${this.baseUrl}/${user.uid}`,user);
  }

  getUserById(id:string):Observable<User>{
    return this.http.get<User>(`${this.baseUrl}/${id}`);
  }
}
