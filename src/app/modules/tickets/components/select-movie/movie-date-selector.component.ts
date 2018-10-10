import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { MovieTimesComboItem } from '../../models/combos/movie-times-combo-item';

@Component({
  selector: 'app-movie-date-selector',
  template: `
  <select id="time" class="movie generalSelectBox "
  ([ngModel])="currentActiveMovieId"
  (change)="selectActiveMovieId($event.target.value);" >
   <option *ngFor="let item of movieTimes" [value]="item.activeMovieId"
   [selected]="item.activeMovieId == currentActiveMovieId" >
   {{getTimeString(item)}}</option>
  </select>

  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieDateSelectorComponent implements OnInit {
  @Input() movieTimes: Array<MovieTimesComboItem>;
  @Output() selectedActiveMovieId = new EventEmitter<number>();

  currentActiveMovieId: number = 0;

  constructor() { 
  }

  ngOnInit() {
  }

  selectActiveMovieId(activeMovieId) {
    this.currentActiveMovieId = +activeMovieId;
    this.selectedActiveMovieId.emit(+activeMovieId);
  }

  getTimeString(item: MovieTimesComboItem): string {
    if (item.activeMovieId === 0 ) {
      return 'Select Time';
    }

    return item.date + ' - ' +  item.time + '(' + item.venueName + ')';
  }
}
