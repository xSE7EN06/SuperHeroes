import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404PageComponent } from './shared/pages/error404-page/error404-page.component';

//Definir las rutas principales de la aplicación 
const routes: Routes = [
  {
    path: 'auth', //Ruta padre para autenticacion
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
  },

  {
    path: 'heroes', //Ruta padre para heroes
    loadChildren: () => import('./heroes/heroes.module').then(m => m.HeroesModule),
    //lazy loading carfa el modulo de autenticacion solo cuando se accede a heroes
  },
  
  {
    path: '404',
    component: Error404PageComponent,
  },

  {
    path: '', //Ruta padre(inicial) para cualquier otra ruta
    redirectTo: 'heroes', //Redirecciona a la ruta heroes/list
    pathMatch: 'full', //Solo se redirecciona si la ruta es exactamente vacia
  },
  {
    path: '**', //Ruta comodin,se usa cuando ninguna de las rutas anteriores coincide
    redirectTo: '404', //Redirecciona a la ruta 404
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
