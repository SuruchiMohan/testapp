import { Movie } from './movie';
import { Venue } from './venue';

export interface ActiveMovie {
    activeMovieId: number;
    date: string;
    time: string;
    venue: Venue;
    movie: Movie;

}
