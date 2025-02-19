import { Component, Input, OnInit } from '@angular/core';
import { Hero } from '../../interfaces/hero.interface';

@Component({
  selector: 'heroes-hero-card',
  templateUrl: './card.component.html',
  styles: ``,
  standalone: false
})
export class CardComponent implements OnInit{
  @Input()
  //permite que el componente padre pase un valor a esta propiedad

  public hero!:Hero;
  //Define la propiedad hero, que representa un heroe y debe ser recibida como entrada.

  ngOnInit(): void {
      //metodo que se va a ejecutar automaticamente cuando el componente es incializado
      if(!this.hero) throw Error ('Heroe property is requiered');
      //mostrar error si no se recibe un heroe valido.

  }

}
