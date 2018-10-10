import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { TicketsService } from '../../services/tickets.service';
import { Observable } from 'rxjs';
import { MoviesComboItem } from '../../models/combos/movies-combo-item';
import { MovieTimesComboItem } from '../../models/combos/movie-times-combo-item';



@Component({
  selector: 'app-select-movie-container',
  templateUrl: './select-movie-container.component.html',
  styles: []
})
export class SelectMovieContainerComponent implements OnInit {

  movies$: Observable<Array<MoviesComboItem>>;
  movieTimes$: Observable<Array<MovieTimesComboItem>>;
  currentSelectedActiveMovieId: number = 0;


  constructor(private ticketsService: TicketsService, private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.ticketsService.loadActiveMovies();

    this.movies$ = this.ticketsService.getMoviesCombo()
    // this.selectedMovieId$ = this.ticketsService.getSelectedMovieId();
    this.movieTimes$ = this.ticketsService.getMovieTimesCombo();
  }


  onSelectedMovieId(movieId: number) {
    this.ticketsService.setSelectedMovieId(+movieId);
	this.onSelectedActiveMovieId(0);

  }

  onSelectedActiveMovieId(activeMovieId: number) {
    this.currentSelectedActiveMovieId = +activeMovieId;
    this.ticketsService.setSelectedActiveMovieId(+activeMovieId);
  }

  purchaseTickets() {
    if (this.currentSelectedActiveMovieId !== 0) {
      this.router.navigate(['../selectseats'], { relativeTo: this.route });
    }
  }

}
