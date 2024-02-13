import { CommonModule, JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-dinamicos-reactive',
  standalone: true,
  imports: [ReactiveFormsModule,JsonPipe,CommonModule],
  templateUrl: './dinamicos.component.html'
})
export class DinamicosComponent {

  constructor(private fb:FormBuilder){}

  get favorites(){
    return this.myForm.get('favorites') as FormArray;
  }

  myForm:FormGroup = this.fb.group({
    name: ['Jesus',[Validators.required]],
    
    favorites : this.fb.array([
      ['Alambra',Validators.required],
      ['Estrella galicia',Validators.required]
    ]  ,Validators.required)
  })


  delete(i:number){
    this.favorites.removeAt(i);
  }
}
