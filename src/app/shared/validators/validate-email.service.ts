import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ValidateEmailService implements AsyncValidator{

  constructor(private http:HttpClient) { }

  urlUser : string = "http://localhost:3000/users/";

  validate(control: AbstractControl<any, any>): Observable<ValidationErrors | null> {
    return this.http.get<any[]>(`${this.urlUser}?email=${control.value}`)
    .pipe(
      map( resp => (resp.length == 0) ? null : { emailTaken: true})
    )
  }
}
