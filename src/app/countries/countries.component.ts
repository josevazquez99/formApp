import { JsonPipe, LowerCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CountriesService } from '../shared/service/countries.service';
import { SmallContry } from '../shared/interfaces/countries';
import { delay, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-countries',
  standalone: true,
  imports: [ReactiveFormsModule,JsonPipe,LowerCasePipe],
  templateUrl: './countries.component.html',
  styleUrl: './countries.component.css'
})
export class CountriesComponent implements OnInit{

  regions: string[] = [];
  countries: SmallContry[] = [];
  borders: SmallContry[] = [];
  loading: boolean = false

  constructor(private fb : FormBuilder, private countriesService : CountriesService){ }

  myForm: FormGroup = this.fb.group({
    region: ["",[Validators.required]],
    country: ["",[Validators.required]],
    border: ["",[]]
  })

  save(){
    if(this.myForm.valid){
      alert("Formulario enviado");
    }else{
      this.myForm.markAllAsTouched();
    }
  }

  ngOnInit(): void {
    this.regions = this.countriesService.regions;
    
    this.myForm.get('region')?.valueChanges
      .pipe(
        tap( region => {
          this.myForm.get('country')?.reset('');
          this.loading = true;
        }),
        delay(2000),
        switchMap( region => this.countriesService.getCountriesByRegion(region))
      )
      .subscribe({
        next: countries => {
          this.countries = countries.sort((a,b) => a.name.common.toLocaleLowerCase().localeCompare(b.name.common.toLocaleUpperCase()))
          this.loading = false;
        },
        error: error => {
          console.log(error)
          this.loading = false;
        }      })

    this.myForm.get('country')?.valueChanges
      .pipe(
        tap(country => {
          this.myForm.get('border')?.reset('')
          this.loading = true;
        }),
        delay(2000),
        switchMap( country => this.countriesService.getBordersByCountry(country)),
        switchMap( borders => this.countriesService.getCountriesByCode(borders?.borders!)) 
      )
      .subscribe({
        next: countries => {
          this.borders = countries;
          this.loading = false;
        },
        error: error => {
          console.log(error)
          this.loading = false;
        }
      })
  }

}
