import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

interface Person{
  genero:string,
  notificaciones:boolean
}

@Component({
  selector: 'app-switches-reactive',
  standalone: true,
  imports: [ReactiveFormsModule,JsonPipe],
  templateUrl: './switches.component.html'
})
export class SwitchesComponent implements OnInit{

  constructor(private fb:FormBuilder){}


  myForm:FormGroup = this.fb.group({
    genero: ['',[Validators.required]],
    notificaciones: [false],
    terminos: [false,[Validators.requiredTrue]]
  })

  person : Person = {
    genero: "M",
    notificaciones: false
  }

  ngOnInit(): void {
    this.myForm.setValue({
      ... this.person,
      terminos:false
    })
    //this.myForm.reset()

    this.myForm.valueChanges.subscribe({
      next: ({terminos, ...person}) => {
        //delete values.terminos
        this.person = person
      }
    })
  }

  submit(){
    const {terminos, ...rest} = this.myForm.value
    this.person = rest;
  }
}
