import { CommonModule, JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ValidatorsService } from '../../shared/validators/validators.service';
import { ValidateEmailService } from '../../shared/validators/validate-email.service';
import { HttpClient } from '@angular/common/http';
import { ValidateUsernameService } from '../../shared/validators/validate-username.service';
import { UserService } from '../../shared/service/user.service';

interface Usuario{
  nombre:string,
  email:string,
  username:string,
  password:string
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule,JsonPipe,CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{
  
  constructor(
    private fb: FormBuilder,
    private serviceValidator:ValidatorsService,
    private emailValidator:ValidateEmailService,
    private usernameValidator:ValidateUsernameService,
    private serviceUser: UserService){}
  

  myForm: FormGroup = this.fb.group({
    nombre: ["",[Validators.required,Validators.pattern(this.serviceValidator.nameSurnamePatter)]],
    email: ["", [Validators.required,Validators.pattern(this.serviceValidator.emailPattern)],[this.emailValidator]],
    username: ["",[Validators.required,this.serviceValidator.forbiddenNameValidator("jesus")],[this.usernameValidator]],
    password: ["",Validators.required],
    passwordConfirm: ["",Validators.required]
  },{validators:[this.serviceValidator.equalsFields('password','passwordConfirm')]})

  usuario : Usuario = {
    nombre:"",
    email:"",
    username:"",
    password:""
  }

  get emailErrosMsg():string{
    const errors = this.myForm.get("email")?.errors;
    let errorMsg = "";
    if(this.myForm.get("email")?.touched && errors){
      if(errors['required']){
        errorMsg = "El email es obligatorio";
      }else if(errors['pattern']){
        errorMsg = "El email no tiene formato correcto";
      }else if(errors['emailTaken']){
        errorMsg = "El email ya existe en base de datos";
      }
    }

    return errorMsg;
  }

  submit(){
    if(this.myForm.invalid){
      this.myForm.markAllAsTouched();
    }else{
      const {passwordConfirm, ...rest} = this.myForm.value;
      this.usuario = rest;
      this.serviceUser.addUser(rest).subscribe({
        next: (data) => console.log("Añadido con éxito")
      })
   }

  }

  ngOnInit(): void {
    this.myForm.valueChanges.subscribe({
      next: ({passwordConfirm, ...values}) => {
        this.usuario = values;
      }
    })
  }

  isValid(field:string){
    return this.myForm.controls[field].errors && this.myForm.controls[field].touched;
  }
}
