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

  getHeroById(id: string): Observable<Hero | undefined>{
    //Método que obtine un heroe especifico basado en su ID
    //retorna un observable que puede ser un heroe o "undefined" (si no existe el heroe)
    return this.http.get<Hero>(`${this.baseUrl}/heroes/${id}`).pipe(catchError(error => of(undefined)));
    //se usa pipe para procesar el resultado de la petición
    //si ocurre un error devuelve "undefined"
  }

  getSuggestions (query: string): Observable<Hero[]>{
    return this.http.get<Hero[]>(`${this.baseUrl}/heroes?q=${query}&_limit=6`);
  }
  
}
