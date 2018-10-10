import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { SeatDetails } from '../../../models/seating/seat-details';

@Component({
  selector: 'app-selected-seats',
  template: `
    <div class="panel-heading">Selected Seats: {{selectedSeats.length}}</div>
    <div *ngFor="let seatDetails of selectedSeats">
      {{seatDetails | selectedSeat}}
    </div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectedSeatsComponent implements OnInit {
  @Input() selectedSeats: Array<SeatDetails>;
  constructor() { }

  ngOnInit() {
  }

}
