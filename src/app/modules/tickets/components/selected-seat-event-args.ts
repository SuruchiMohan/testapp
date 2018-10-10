import { SeatDetails } from "../models/seating/seat-details";
export interface SelectedSeatEventArgs {
    seat: SeatDetails;
    newStatus: number;
}
