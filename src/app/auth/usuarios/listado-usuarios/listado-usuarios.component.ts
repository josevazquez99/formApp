import { Component, OnInit } from '@angular/core';
import { User } from '../../interfaces/interfaces';
import { UsersService } from '../../services/users.service';
import { CommonModule } from '@angular/common';
import { map, tap } from 'rxjs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-listado-usuarios',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './listado-usuarios.component.html',
  styleUrl: './listado-usuarios.component.css'
})
export class ListadoUsuariosComponent implements OnInit{
  users: User[] = [];
  
  constructor(private userService: UsersService){}


  ngOnInit(): void {
    this.userService.getUsers()
    .subscribe({
      next: (resp) => this.users = resp,
      error: (error) => console.log(error)
    })
  }


  delete(id:string){
    this.userService.delete(id).subscribe({
      next: user => {
        this.users = this.users.filter(userF => userF.uid !== user.uid);
      } 
    })
  }
}
