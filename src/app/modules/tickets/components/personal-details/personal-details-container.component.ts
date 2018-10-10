import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TicketsService } from '../../services/tickets.service';
import { SeatDetails } from '../../models/seating/seat-details';
import { CheckoutEventArgs } from './checkout-event-args';
import { ActiveMovie } from '../../models/active-movie';

@Component({
  selector: 'app-personal-details-container',
  templateUrl: './personal-details-container.component.html',
  styles: []
})
export class PersonalDetailsContainerComponent implements OnInit {

  selectedSeats$: Observable<Array<SeatDetails>>;
  activeMovie$: Observable<ActiveMovie>;

  constructor(private ticketsService: TicketsService, private router: Router,
      private route: ActivatedRoute) { }
  ngOnInit() {

    this.selectedSeats$ = this.ticketsService.getSelectedSeats();
    this.activeMovie$ = this.ticketsService.getSelectedActiveMovie();

  }

  onCompletePurchase(args: CheckoutEventArgs) {
    this.ticketsService.completePurchase(args.fullName, args.email, args.ccNumber)
    .subscribe(() =>
      alert('Purchase completed')
    );
  }

}
