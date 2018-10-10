import { ActiveMovie } from './active-movie';
import { SeatingPlan } from './seating/seating-plan';
import { SeatDetails } from './seating/seat-details';

import { Observable, BehaviorSubject } from 'rxjs';
import { OrderDetails } from './order-details';

export class State {
  uiState: BehaviorSubject<UiState>;
  storeData: BehaviorSubject<StoreData>;

  constructor() {
    this.uiState = new BehaviorSubject<UiState>(INITIAL_UI_STATE),
      this.storeData = new BehaviorSubject<StoreData>(INITIAL_STORE_DATA);

  }
}

export class State$ {
  uiState: Observable<UiState>;
  storeData: Observable<StoreData>;
  constructor(state: State) {
    this.uiState = state.uiState.asObservable();
    this.storeData = state.storeData.asObservable()

  }
}

export interface UiState {
  selectedMovieId: number;
  selectedActiveMovieId: number;
  moviesLoaded: boolean;
  seatPlanLoaded: boolean;
  selectedSeats: Array<SeatDetails>;
  isPurchaseCompleted: boolean;
  orderDetails: OrderDetails;
  orderId: string;
}

export interface StoreData {
  activeMoviesRepository: Array<ActiveMovie>;
  VenueSeatingPlan: SeatingPlan;
}

export const INITIAL_UI_STATE: UiState = {
  selectedMovieId: null,
  selectedActiveMovieId: null,
  moviesLoaded: false,
  seatPlanLoaded: false,
  selectedSeats: new Array<SeatDetails>(),
  isPurchaseCompleted: false,
  orderDetails: <OrderDetails>{},
  orderId: null
};

export const INITIAL_STORE_DATA: StoreData = {
  activeMoviesRepository: new Array<ActiveMovie>(),
  VenueSeatingPlan: undefined
};


