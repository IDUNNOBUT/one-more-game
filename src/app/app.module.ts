import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { HeaderComponent } from './header/header.component';
import {HttpClientModule} from "@angular/common/http";
import { DARK_MODE_OPTIONS } from 'angular-dark-mode';
import { InfiniteScrollComponent } from './infinite-scroll/infinite-scroll.component';
import {InfiniteScrollModule} from "ngx-infinite-scroll";
import {FormsModule} from "@angular/forms";
import { SpinnersAngularModule } from 'spinners-angular';
import { GameCardComponent } from './game-card/game-card.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { GamePageComponent } from './game-page/game-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    HeaderComponent,
    InfiniteScrollComponent,
    GameCardComponent,
    GamePageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    InfiniteScrollModule,
    FormsModule,
    SpinnersAngularModule,
    BrowserAnimationsModule,
  ],
  providers: [
    {
      provide: DARK_MODE_OPTIONS,
      useValue: {
        storageKey: 'dark'
      }
    }
  ],
  bootstrap: [AppComponent],
  exports: [
  ]
})
export class AppModule { }
