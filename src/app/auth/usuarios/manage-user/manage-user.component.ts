import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { User, UserPut } from '../../interfaces/interfaces';
import { UsersService } from '../../services/users.service';
import { ValidateEmailService } from '../../../shared/validators/validate-email.service';
import { ValidatorsService } from '../../../shared/validators/validators.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage-user',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './manage-user.component.html',
  styleUrl: './manage-user.component.css'
})
export class ManageUserComponent implements OnInit{

  constructor(private fb : FormBuilder, private usersService:UsersService,private serviceValidator:ValidatorsService){}

  @Input() id = "";

  myForm : FormGroup = this.fb.group({
    name: ["",[Validators.required]],
    username: ["",[Validators.required]],
    email: ["",[Validators.required]],
    password: ["",[Validators.required]],
    passwordConfirm: ["",[Validators.required]],
  },{validators:[this.serviceValidator.equalsFields("password","passwordConfirm")]})

  submit(){
    if(this.myForm.valid){
      let {name,username,email,password,role} = this.myForm.value
      let userForm = {name,username,email,password,role, active:true,uid:this.id};
      this.usersService.update(userForm)
        .subscribe({
        next: user => {
          Swal.fire({
            icon: "success",
            title: "Done",
            text: `User ${user.name} edited!`,
          });
        }
      })
    }else{
      this.myForm.markAllAsTouched();
    }
  }

  isValid(field:string){
    return this.myForm.get(field)?.errors && this.myForm.get(field)?.touched;
  }

  ngOnInit(): void {
    this.usersService.getUserById(this.id).subscribe({
      next:(user) => {
        const {active, uid, ...rest} = user;
        this.myForm.reset(rest);
      },
      error:(error) => console.log(error)
    });
  }

}
