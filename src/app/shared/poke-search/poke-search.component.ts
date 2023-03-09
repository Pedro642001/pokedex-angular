import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { debounceTime, distinctUntilChanged, fromEvent, map, tap } from 'rxjs';

@Component({
  selector: 'poke-search',
  templateUrl: './poke-search.component.html',
  styleUrls: ['./poke-search.component.scss'],
})
export class PokeSearchComponent implements AfterViewInit {
  @ViewChild('input')
  input?: ElementRef<HTMLInputElement>;

  @Output()
  emitSearch: EventEmitter<string> = new EventEmitter();

  constructor() {}
  ngAfterViewInit(): void {
    if (!this.input) {
      return;
    }
    fromEvent<KeyboardEvent>(this.input.nativeElement, 'keyup')
      .pipe(
        debounceTime(500),
        map((event) => {
          return (event.target as HTMLInputElement).value;
        }),
        distinctUntilChanged(),
        tap((value) => {
          this.emitSearch.emit(value);
        })
      )
      .subscribe();
  }
}
