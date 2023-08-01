import { Component, OnInit } from '@angular/core';
import {debounceTime, distinctUntilChanged, Observable, Subject, switchMap} from "rxjs";


import { Hero } from '../hero';
import { HeroService } from '../hero.service';
@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css']
})
export class HeroSearchComponent implements OnInit{
  // Notice the declaration of heroes$ as an Observable.
  // $ is part of the name - a convention for var of Observable type.
  // ! is the non-null assertion operator. It is a way to tell the compiler
  // "this expression cannot be null or undefined here, so don't complain
  // about the possibility of it being null or undefined."
  // Sometimes the type checker is unable to make that determination itself.
  heroes$!: Observable<Hero[]>;

  // This is like an observable stream
  // A Subject is a special type of Observable that allows values to
  // be multicasted to many Observers
  // A Subject is both a source of observable values and an Observable itself.
  // You can subscribe to a Subject as you would any Observable.
  private searchTerms = new Subject<string>();

  constructor(private heroService: HeroService) {
  }

  // push a search term into an observable stream - Subject.
  // You can also push values into that Observable by calling its next(value)
  // method as the search() method does.
  // Every time the user types in the text box, the binding calls search()
  // with the text box value as a search term. The searchTerms becomes an
  // Observable emitting a steady stream of search terms.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    // https://angular.io/tutorial/tour-of-heroes/toh-pt6
    // Passing a new search term directly to the searchHeroes() after every
    // user keystroke creates excessive HTTP requests, which taxes server
    // resources and burning through data plans.
    // Instead, this pipes the searchTerms observable through a sequence of
    // RxJS operators that reduce the number of calls to the searchHeroes().
    // Ultimately, this returns an observable of timely hero search results
    // where each one is a Hero[].
    this.heroes$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as prev term
      // ensures that a request is sent only if the filter text changed.
      distinctUntilChanged(),

      // // switch to new search observable each time the term changes
      // switchMap() calls the search service for each search term that makes
      // it through debounce() and distinctUntilChanged(). It cancels and
      // discards previous search observables, returning only the latest
      // search service observable.
      switchMap((term: string) => this.heroService.searchHeroes(term)),
    );
  }
}
