import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Hero } from '../../interfaces/hero.interface';
import { timestamp } from 'rxjs';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styles: ``
})
export class SearchPageComponent {
  public searchInput = new FormControl('');
  public heroes: Hero[] = [];
  public selectedHero?: Hero;

  public loaded: boolean = false;

  constructor(private heroesService: HeroesService){

  }

  searchHero(){
    const value:string = this.searchInput.value || '';

    this.heroesService.getSuggestions(value).subscribe( heroes => this.heroes = heroes);
  }

  onSelectedOption( event: MatAutocompleteSelectedEvent): void{
    if(!event.option.value){
      this.selectedHero = undefined;
      this.loaded = false;
      return;
    }

    const hero: Hero = event.option.value;
    this.searchInput.setValue(hero.superhero);

    this.selectedHero = hero;
   
  if (this.selectedHero) {
    this.loaded = true;  // Muestra la tarjeta si se encuentra el héroe
  } else {
    this.loaded = false; // Oculta la tarjeta si no se encuentra
  }
  }
}
