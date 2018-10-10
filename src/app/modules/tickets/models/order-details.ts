import { SeatDetails } from './seating/seat-details';
export interface OrderDetails {
    activeMovieId: number;
    reservedSeats: Array<SeatDetails>;
    fullName: string;
    email: string;
    ccNumber: string;
}
