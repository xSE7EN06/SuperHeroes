import { Injectable } from '@angular/core';
import { enviroments } from '../../../environments/enviroments';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of} from 'rxjs';

import { Hero } from '../interfaces/hero.interface';

//Estamos creando un servcio esta disponible en toda la pagina
@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  //estamos llamando a las variable baseUrl de las variables de entorno
  private baseUrl: string = enviroments.baseUrl;

  constructor(private http: HttpClient) { }

  getHeroes():Observable<Hero[]>{
    return this.http.get<Hero[]>(`${ this.baseUrl }/heroes`);
  }
}
