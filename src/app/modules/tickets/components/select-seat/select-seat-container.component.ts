import { Component, OnInit } from '@angular/core';
import { TicketsService } from '../../services/tickets.service';
import { Observable } from 'rxjs';
import { SeatingPlan } from '../../models/seating/seating-plan';
import { SeatDetails } from '../../models/seating/seat-details';
import { ActivatedRoute, Router } from '@angular/router';
import { ActiveMovie } from '../../models/active-movie';
import { SelectedSeatEventArgs } from '../selected-seat-event-args';

@Component({
  selector: 'app-select-seat-container',
  templateUrl: './select-seat-container.component.html',
  styles: []
})
export class SelectSeatContainerComponent implements OnInit {
  seatingPlan$: Observable<SeatingPlan>;
  selectedSeats$: Observable<Array<SeatDetails>>;
  activeMovie$: Observable<ActiveMovie>;

  constructor(private ticketsService: TicketsService, private router: Router,
      private route: ActivatedRoute) { }
  ngOnInit() {

    this.ticketsService.loadActiveMovieSeatPlan();

    this.seatingPlan$ = this.ticketsService.getSeatingPlan();
    this.selectedSeats$ = this.ticketsService.getSelectedSeats();
    this.activeMovie$ = this.ticketsService.getSelectedActiveMovie();
  }

  onSeatSelected(eventArgs: SelectedSeatEventArgs) {
    this.ticketsService.selectSeat(eventArgs.seat, eventArgs.newStatus);
  }

  purchaseTickets() {
    this.router.navigate(['../personal-details'], {relativeTo: this.route});
    }
    
}
