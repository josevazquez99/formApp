import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, combineLatest, of } from 'rxjs';
import { Border, SmallContry } from '../interfaces/countries';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  private _regions : string[] = ['Africa','Americas','Antarctic','Asia','Europe','Oceania'];
  private baseUrl : string = "https://restcountries.com/v3.1"
  get regions () : string[]{
    return [...this._regions];
  }

  constructor(private http : HttpClient) { }

  getCountriesByRegion(region:string) : Observable<SmallContry[]>{
    if(!region){
      return of([]);
    }
    return this.http.get<SmallContry[]>(`${this.baseUrl}/region/${region}?fields=name,ccn3`);
  }

  getBordersByCountry(cod:string) : Observable<Border | null> {
    if(!cod){
      return of(null);
    }
    return this.http.get<Border>(`${this.baseUrl}/alpha/${cod}?fields=borders`);
  }

  getCountryCode(code : string) : Observable<SmallContry>{
    return this.http.get<SmallContry>(`${this.baseUrl}/alpha/${code}/?fields=name,ccn3`);
  }

  getCountriesByCode(borders: string[]) : Observable<SmallContry[]>{
    if(!borders){
      return of([]);
    }else if(!borders.length){
      return of([]);
    }
    let requests : Observable<SmallContry>[] = [];
    borders.forEach( code => {
      const request = this.getCountryCode(code);
      requests.push(request);
    })

    return combineLatest(requests);
  }
}
