import { Component } from '@angular/core';
import { last } from 'rxjs';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styles: ``
})
export class LayoutPageComponent {

  public sidebarItems = [
    {label: 'Listado', icon: 'label', url: './list'},
    {label: 'Añadir', icon:'add', url: './new-heroe'},
    {label: 'Buscar', icon: 'search', url: './search'},
  ]

}
