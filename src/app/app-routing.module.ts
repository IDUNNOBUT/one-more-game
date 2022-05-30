import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomePageComponent} from "./home-page/home-page.component";
import {GamePageComponent} from "./game-page/game-page.component";

const routes: Routes = [
  {path:'',
    component:HomePageComponent},
  {path:'start',redirectTo:'',pathMatch:'full'},
  {path:'game/:id',pathMatch: 'full',
    component:GamePageComponent
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
