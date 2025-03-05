import { Injectable } from '@angular/core';
import { enviroments } from '../../../environments/enviroments';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of} from 'rxjs';

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

  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(`${this.baseUrl}/heroes`, hero);
  }

  

  updateHero(hero: Hero): Observable<Hero> {
    //Validacion antes de hacer la peticion
    if(!hero.id) throw Error('Hero is requiered');

    return this.http.patch<Hero>(`${this.baseUrl}/heroes/${hero.id}`, hero);
  }

  deleteHeroById(id: string): Observable<boolean> {
    return this.http.delete(`${this.baseUrl}/heroes/${id}`).pipe(
      map(() => true), // Si la petición es exitosa, devuelve true
      catchError(err => {
        console.error('Error eliminando el héroe:', err);
        return of(false); // Si hay error, devuelve false
      })
    );
  }
}
