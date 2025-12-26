import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing-module';

import { App } from './app';
import { Characters } from './characters/characters';
import { Home } from './home/home';
import { Transformations } from './transformations/transformations';
import { About } from './about/about';
import { Error } from './error/error';
import { Header } from './header/header';

import { Series } from './series/series';

@NgModule({
  declarations: [
   App,
    Home,
    Transformations,
    Characters,
    About,
    Error,
    Header,
  
  ],
  imports: [
      BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
      Series 
  ],
  providers: [],
  bootstrap: [App]
})
export class AppModule {}
