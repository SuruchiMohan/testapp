import { Component, OnInit, Input, EventEmitter, Output, ChangeDetectionStrategy } from '@angular/core';
import { SeatingPlan } from '../../../models/seating/seating-plan';
import { SeatDetails } from '../../../models/seating/seat-details';
import { SelectedSeatEventArgs } from '../../selected-seat-event-args';

@Component({
  selector: 'app-seat-chart',
  template: `
    <svg width=500 height=250>
        <g *ngFor="let onerow of seatingPlan?.rows">
            <text x="2" [attr.y]="30 * onerow.rowNumber+14" style="stroke: #660000; fill: #660000">
                {{onerow.rowNumber}}
            </text>

            <g *ngFor="let oneseat of onerow.seats"  class="hover_group">
                <rect *ngIf="oneseat.status != 0" cursor="pointer"
                      [attr.x]="30 * oneseat.positionId"
                      [attr.y]="30 * oneseat.rowNumber"
                      width="20" height="20"
                      rx="5" ry="5"
                      style="stroke:pink;stroke-width:5;opacity:0.5"
                      [attr.fill]="seatColor(oneseat)"
                      [attr.cursor]="seatCursor(oneseat)"
                      (click)="selectSeat(oneseat)"/>
            </g>
        </g>
    </svg>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SeatChartComponent implements OnInit {
  @Input() seatingPlan: SeatingPlan;
  @Output() seatSelected = new EventEmitter<any>();

  constructor() { 
  }

  ngOnInit() {
  }

  selectSeat(seat: SeatDetails) {
    let newstatus = seat.status;
    switch (seat.status) {
      case 1:
        newstatus = 9;
        break;
      case 2:
        break;
      case 9:
        newstatus = 1;
        break;
    }

    const eventargs =  <SelectedSeatEventArgs>{'seat': seat, 'newStatus': newstatus };
    console.log(eventargs);
    this.seatSelected.emit(eventargs);
  }

  seatColor(seat: SeatDetails): string {
    let color: string;
    switch (seat.status) {
      case 0:
        color = 'black';
        break;
      case 1:
        color = 'blue';
        break;
      case 2:
        color = 'red';
        break;
      case 9:
        color = 'green';
        break;
    }

    return color;
  }

  seatCursor(seat: SeatDetails) {
    let cursor: string;
    switch (seat.status) {
      case 0:
      case 2:
        cursor = 'default';
        break;
      case 1:
      case 9:
        cursor = 'pointer';
        break;
    }

    return cursor;
  }

}
