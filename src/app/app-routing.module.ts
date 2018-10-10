import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './modules/home/home.component';
import { SelectMovieContainerComponent } from './modules/tickets/components/select-movie/select-movie-container.component';

import { SelectSeatContainerComponent } from './modules/tickets/components/select-seat/select-seat-container.component';
import { PersonalDetailsContainerComponent } from './modules/tickets/components/personal-details/personal-details-container.component';

const ticketsRoutes: Routes = [

  {path: 'selectmovie', component: SelectMovieContainerComponent},
  {path: 'selectseats', component: SelectSeatContainerComponent},
  {path: 'personal-details', component: PersonalDetailsContainerComponent}

]


const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    {path: 'tickets', children: ticketsRoutes},
    {path: '**', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {enableTracing: true, useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
