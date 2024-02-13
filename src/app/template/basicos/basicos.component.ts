import { Component, OnInit, ViewChild } from '@angular/core';
import { SideMenuComponent } from '../../shared/side-menu/side-menu.component';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule, JsonPipe } from '@angular/common';
import { AuthService } from '../../auth/services/auth.service';
import { User } from '../../auth/interfaces/interfaces';

@Component({
  selector: 'app-basicos',
  standalone: true,
  imports: [SideMenuComponent, FormsModule, JsonPipe, CommonModule],
  templateUrl: './basicos.component.html'
})
export class BasicosComponent implements OnInit{
  @ViewChild('myForm') myForm!: NgForm

  user!:User;
  constructor(private authService:AuthService){}

  ngOnInit(): void {
    this.user = this.authService.user;
  }


  isLetter(test: string):void{
    const pattern = new RegExp('^[A-Z]+$', 'i');
    if (!pattern.test(test)){
      this.myForm?.controls['product']?.setErrors({'product': true})

    }
    // else{
    //   this.myForm?.controls['product']?.setErrors(null)
    // }
  }


  notValid(field: string): boolean{
    return this.myForm?.controls[field]?.invalid && this.myForm?.controls[field]?.touched
  }

  submit(){
      console.log(this.myForm)
  }
}
