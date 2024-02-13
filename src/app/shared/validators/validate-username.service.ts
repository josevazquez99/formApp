import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ValidateUsernameService implements AsyncValidator{

  constructor(private http : HttpClient) { }

  validate(control: AbstractControl):  Observable<ValidationErrors | null> {
    return this.http.get<any[]>(`http://localhost:3000/users/?username=${control.value}`)
    .pipe(
      map(resp => resp.length == 0 ? null : {usernameTaken:true})
    )
  }
}
