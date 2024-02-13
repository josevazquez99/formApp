import { CommonModule, JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-basicos-reactive',
  standalone: true,
  imports: [ReactiveFormsModule,JsonPipe,CommonModule],
  templateUrl: './basicos.component.html'
})
export class BasicosComponent {

  constructor(private fb:FormBuilder){}

  myForm:FormGroup = this.fb.group({
    name:['',[Validators.required,Validators.minLength(3),Validators.maxLength(10)]],
    price:[0,[Validators.required,Validators.min(0)]],
    stock:[0,[Validators.required,Validators.min(1)]]
  })

  isValidField(field:string){
    return this.myForm.controls[field].errors && this.myForm.controls[field].touched;
  }

  submit(){
    if(this.myForm.valid){
      console.log("Formulario enviado");
      this.myForm.reset({});
    }else{
      this.myForm.markAllAsTouched();
    }
  }
}
