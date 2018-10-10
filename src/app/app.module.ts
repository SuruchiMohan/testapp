import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';

import { HeaderComponent } from './modules/core/components/header.component';
import { LogService } from './modules/core/services/log.service';
import { HttpService } from './modules/core/services/http.service';
import { HomeComponent } from './modules/home/home.component';
import { SelectMovieContainerComponent } from './modules/tickets/components/select-movie/select-movie-container.component';
import { SelectSeatContainerComponent } from './modules/tickets/components/select-seat/select-seat-container.component';
import { MovieSelectorComponent } from './modules/tickets/components/select-movie/movie-selector.component';
import { MovieDateSelectorComponent } from './modules/tickets/components/select-movie/movie-date-selector.component';
import { SeatChartComponent } from './modules/tickets/components/select-seat/seat-chart/seat-chart.component';
import { SelectedSeatsComponent } from './modules/tickets/components/select-seat/seat-chart/selected-seats.component';




import { SelectedMovieDetailsComponent } from './modules/tickets/components/selected-movie-details/selected-movie-details.component';
import { TicketsService } from './modules/tickets/services/tickets.service';

import { HttpClientModule } from '@angular/common/http';
import { SelectedSeatPipe } from './modules/tickets/components/select-seat/seat-chart/selected-seat.pipe';
import { CheckoutFormComponent } from './modules/tickets/components/personal-details/checkout/checkout-form.component';
import { PersonalDetailsContainerComponent } from './modules/tickets/components/personal-details/personal-details-container.component';

const ticketsComponents = [SelectMovieContainerComponent, SelectSeatContainerComponent,
  MovieSelectorComponent, MovieDateSelectorComponent,
  SeatChartComponent, SelectedSeatsComponent,
  SelectedMovieDetailsComponent
];

const ticketsServices = [TicketsService];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent, HomeComponent, ticketsComponents, SelectedSeatPipe, CheckoutFormComponent,
    PersonalDetailsContainerComponent
  ],
  imports: [
    BrowserModule, HttpClientModule,FormsModule, ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [LogService, HttpService, ticketsServices
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
