import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { MoviesComboItem } from '../../models/combos/movies-combo-item';

@Component({
  selector: 'app-movie-selector',
  template: `
  <select id="movie" class="movie generalSelectBox"
  ([ngModel])="currentMovieId"
  (change)="selectMovieId($event.target.value);" >
     <option *ngFor="let movie of movies" [value]="movie.movieId"
     [selected]="movie.movieId == currentMovieId">
     {{movie.movieName}}</option>
  </select>

  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieSelectorComponent implements OnInit {

  @Input() movies: Array<MoviesComboItem>
  @Output() selectedMovieId = new EventEmitter<number>();

  currentMovieId: number = 0;

  constructor() { 
  }

  ngOnInit() {
  }

  selectMovieId(movieId: number) {
    this.currentMovieId = movieId;
    this.selectedMovieId.emit(+movieId);
  }


}
