import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Hero } from '../../interfaces/hero.interface';

@Component({
  selector: 'app-hero-page',
  templateUrl: './hero-page.component.html',
  styleUrl: './hero-page.css'
})
export class HeroPageComponent implements OnInit{
  public hero?: Hero;
  //Declar una varible publica que almacenara los datos del heroe seleccionado
  constructor(
    private heroService: HeroesService,
    //Inyecta el servicio para obtener la informacion del heroe

    private activatedRoute: ActivatedRoute,
    //Inyecta ActivatedRoute para acceder a los parámetros de la URL

    private router: Router,
    //Inyecta Router para rederigirt a otra pagina si el heroe no existe
  ){}

  ngOnInit(): void{
    //Metodo que se ejecuta automaticamente cuando el componente se incializa

    this.activatedRoute.params.pipe(
      switchMap(({ id }) => {
        console.log("ID recibido de la URL:", id);
        return this.heroService.getHeroById(id);
      })
    ).subscribe( hero => {

      //Se suscribe al observable devuelto por getHero y recibe el heroe encontrado

      if(!hero) return this.router.navigate(['/heroes/list']);
      //si el heroe no existe redirige a la lista de heroes

      this.hero = hero;
      //almacena la informacion del heroe en la variable hero

      console.log({hero});

      return;
    })
  }
}
