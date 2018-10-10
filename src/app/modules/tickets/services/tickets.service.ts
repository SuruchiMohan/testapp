
import { Injectable } from '@angular/core';
import { HttpService } from '../../core/services/http.service';
import * as _ from 'lodash';
import { State, State$, StoreData, UiState, INITIAL_STORE_DATA, INITIAL_UI_STATE } from '../models/state';

import { MoviesComboItem } from '../models/combos/movies-combo-item';
import { MovieTimesComboItem } from '../models/combos/movie-times-combo-item';
import { Movie } from '../models/movie';
import { ActiveMovie } from '../models/active-movie';
import { SeatingPlan } from '../models/seating/seating-plan';
import { RowDetails } from '../models/seating/row-details';
import { SeatDetails } from '../models/seating/seat-details';
import { OrderDetails } from '../models/order-details';
import { environment } from '../../../../environments/environment';

import { Observable } from 'rxjs';
import { map, switchMap, distinctUntilChanged } from 'rxjs/operators';
@Injectable()
export class TicketsService {

  private _store = new State();
  store$ = new State$(this._store);

  constructor(private httpService: HttpService) { }


  getMoviesCombo(): Observable<Array<MoviesComboItem>> {
    return this.store$.storeData
      .pipe(map((x: StoreData) => {
        return _.uniqBy(_.map(x.activeMoviesRepository, 'movie'), (x: Movie) => x.movieId)
          .map(movie => {
            return this.mapMovieToMovieComboItem(movie);
          });
      })
        , distinctUntilChanged()
      );
  }


  private mapMovieToMovieComboItem(movie: Movie): MoviesComboItem {
    return {
      movieId: movie.movieId,
      movieName: movie.movieName
    };
  }

  getMovieTimesCombo(): Observable<Array<MovieTimesComboItem>> {
    // return active movies for the selected movie

    return this.store$.uiState.pipe(
      map((data: UiState) => data.selectedMovieId),
      switchMap((selectedMovieId: number) => {
        return this.store$.storeData
          .pipe(

            map((store: StoreData) => {
              return store.activeMoviesRepository
                .filter((activeMovie: ActiveMovie) =>
                  activeMovie.movie.movieId === selectedMovieId ||
                  activeMovie.movie.movieId === 0)
                .map(activeMovie => {
                  return this.mapActiveMovieToMovieTimesComboItem(activeMovie);
                });
            }),
            distinctUntilChanged()
          );



      }));
  }

  private mapActiveMovieToMovieTimesComboItem(activeMovie: ActiveMovie): MovieTimesComboItem {
    return {
      activeMovieId: activeMovie.activeMovieId,
      date: activeMovie.date,
      time: activeMovie.time,
      venueName: activeMovie.venue.venueName
    };
  }


  setSelectedMovieId(movieId: number) {
    const newstate: UiState = _.cloneDeep(this._store.uiState.getValue());
    newstate.selectedMovieId = movieId;
    this._store.uiState.next(newstate);
  }

  getSelectedMovieId(): Observable<number> {
    return this.store$.uiState.pipe(map((s:UiState) => s.selectedMovieId));
  }

  getSelectedActiveMovie(): Observable<ActiveMovie> {
    return this.store$.uiState
      .pipe(
        map((data: UiState) => data.selectedMovieId),
        switchMap((selectedMovieId: number) => {
          return this.store$.storeData
            .pipe(
              map((store: StoreData) => {
                return store.activeMoviesRepository
                  .filter((activeMovie: ActiveMovie) =>
                    activeMovie.movie.movieId === selectedMovieId)[0];
              }));

        }),
        distinctUntilChanged()
      );
  }



  get IsMoviesLoaded(): Observable<boolean> {
    return this.store$.uiState.pipe(map((state: UiState) => state.moviesLoaded));
  }


  clearState() {
    this._store.storeData.next(INITIAL_STORE_DATA);
    this._store.uiState.next(INITIAL_UI_STATE);

  }

  loadActiveMovies() {

    this.clearState();

    let activeMovies: Array<ActiveMovie> = [];
    this.httpService.get<Array<ActiveMovie>>('/activemovies.json')
      .subscribe(am => {
        // this.httpService.get('/GetMovies')
        //   .subscribe(am => {
        activeMovies = am;
        const newStoreData: StoreData = _.cloneDeep(this._store.storeData.getValue());
        newStoreData.activeMoviesRepository = activeMovies;
        this._store.storeData.next(newStoreData);

        const newUiState: UiState = _.cloneDeep(this._store.uiState.getValue());
        newUiState.selectedMovieId = null;
        newUiState.selectedActiveMovieId = null;
        newUiState.moviesLoaded = true;
        this._store.uiState.next(newUiState);
      });
  }


  setSelectedActiveMovieId(activeMovieId: number) {
    const newstate: UiState = _.cloneDeep(this._store.uiState.getValue());
    newstate.selectedActiveMovieId = activeMovieId;
    this._store.uiState.next(newstate);
  }


  loadActiveMovieSeatPlan() {

    const newStoreData: StoreData = _.cloneDeep(this._store.storeData.getValue());
    const newUiState: UiState = _.cloneDeep(this._store.uiState.getValue());

    if (newUiState.seatPlanLoaded) {
      return;
    }

    this.httpService.get<SeatingPlan>('/seatplan.json')
      // this.httpService.get('/GetSeatingPlan/' + newUiState.selectedActiveMovieId)
      .subscribe((seatingPlan: SeatingPlan) => {
        newStoreData.VenueSeatingPlan = seatingPlan;
        this._store.storeData.next(newStoreData);

        newUiState.seatPlanLoaded = true;
        this._store.uiState.next(newUiState);

      });



  }


  get IsSeatPlanLoaded(): Observable<boolean> {
    return this.store$.uiState.pipe(map((state: UiState) => state.seatPlanLoaded));
  }

  getSeatingPlan(): Observable<SeatingPlan> {
    return this.store$.storeData.pipe(
      map((store: StoreData)=> store.VenueSeatingPlan),
      distinctUntilChanged()
    );
  }

  selectSeat(seat: SeatDetails, newStatus: number) {
    const newstate: UiState = _.cloneDeep(this._store.uiState.getValue());

    // find the seat
    const myrow = this._store.storeData.getValue().VenueSeatingPlan.rows.filter(row => row.rowNumber === seat.rowNumber)[0];
    const myseat = myrow.seats.filter(s => s.positionId === seat.positionId)[0];
    myseat.status = newStatus;

    if (newStatus === 9) {
      newstate.selectedSeats.push(seat);
    }

    if (newStatus === 1) {
      newstate.selectedSeats.splice(newstate.selectedSeats.indexOf(seat), 1);
    }
    this._store.uiState.next(newstate);


  }


  getSelectedSeats(): Observable<Array<SeatDetails>> {
    return this.store$.uiState.pipe(
      map((store: UiState) => store.selectedSeats),
      distinctUntilChanged()
    );
  }

  getIsPurchaseCompleted(): boolean {
    return this._store.uiState.getValue().isPurchaseCompleted;
  }

  completePurchase(fullName: string, email: string, ccNumber: string): Observable<boolean> {


    const newstate: UiState = _.cloneDeep(this._store.uiState.getValue());
    const newOrder: OrderDetails = {
      activeMovieId: newstate.selectedActiveMovieId,
      reservedSeats: newstate.selectedSeats,
      fullName: fullName,
      email: email,
      ccNumber: ccNumber
    };


    // return Observable.create(observer => {
    //   this.httpService.post('PurchaseTickets', newOrder)
    //     .subscribe((orderId: string) => {
    //       newstate.orderDetails = newOrder;
    //       newstate.isPurchaseCompleted = true;
    //       newstate.orderId = orderId;
    //       this._store.uiState.next(newstate);
    //       observer.next(true);
    //       observer.complete();
    //     })
    // })

    return Observable.create(observer => {
      newstate.orderDetails = newOrder;
      newstate.isPurchaseCompleted = true;
      newstate.orderId = '5555';
      this._store.uiState.next(newstate);
      observer.next(true);
      observer.complete();
    });
  }

  getOrderId(): string {

    return this._store.uiState.getValue().orderId;

  }

}


