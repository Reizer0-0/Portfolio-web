import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Home } from './home/home';
import { Series } from './series/series';
import { Transformations } from './transformations/transformations';
import { About } from './about/about';
import { Characters } from './characters/characters';
import { Error } from './error/error';
import { Header } from './header/header';
import { Favourites } from './favourites/favourites';

const routes: Routes = [
  { path: '', component: Home },
  { path: 'header', component: Header },
  { path: 'home', component: Home },
  { path: 'favourites', component: Favourites},
  { path: 'characters', component: Characters},
  { path: 'series', component: Series }, 
  { path: 'transformations', component: Transformations },
  { path: 'about', component: About },
  { path: '**', component: Error }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
