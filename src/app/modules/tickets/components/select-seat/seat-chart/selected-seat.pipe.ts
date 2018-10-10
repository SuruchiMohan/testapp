import { Pipe, PipeTransform } from '@angular/core';
import { SeatDetails } from '../../../models/seating/seat-details';

@Pipe({
  name: 'selectedSeat'
})
export class SelectedSeatPipe implements PipeTransform {

  transform(value: SeatDetails): any {
    return 'Row: ' + value.rowNumber + ', Seat: ' + value.actualSeatNumber;
    }


}
