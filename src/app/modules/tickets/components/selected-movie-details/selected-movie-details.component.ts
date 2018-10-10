import { Component, OnInit, Input } from '@angular/core';
import { ActiveMovie } from '../../models/active-movie';

@Component({
  selector: 'app-selected-movie-details',
  template: `
  <div class="panel-heading">
    <h2>{{activeMovie.movie.movieName}}</h2>
    <h3>{{activeMovie.date}} - {{activeMovie.time}} ({{activeMovie.venue.venueName}})</h3>
  </div>
  `
})
export class SelectedMovieDetailsComponent implements OnInit {
  @Input() activeMovie: ActiveMovie;
  
  constructor() {
  }

  ngOnInit() {
  }
}
