import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../interfaces/person';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  urlUser : string = "http://localhost:3000/users/";

  addUser(user: User):Observable<User>{
    return this.http.post<User>(this.urlUser,user);
  }
}

