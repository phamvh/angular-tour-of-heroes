import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { Observable, of, catchError, map, tap} from "rxjs";
import { HEROES } from "./mock-heroes";
import {Hero} from "./hero";
import {MessageService} from "./message.service";

/**
 * This annotation marks the class as one that participates in the dependency injection system.
 * The HeroService class is going to provide an injectable service, and it can also
 * have its own injected dependencies. It doesn't have any dependencies yet.
 *
 * The @Injectable() decorator accepts a metadata object for the service, the same
 * way the @Component() decorator did for your component classes.
 */
@Injectable({
  /**
   * By default, ng generate service registers a provider with the root injector
   * for your service by including provider metadata, that's providedIn: 'root'
   * in the @Injectable() decorator.
   */
  providedIn: 'root'
})
export class HeroService {
  private heroesUrl = 'api/heroes';  // URL to web api

  /**
   * Edit the constructor with a parameter that declares a private messageService
   * property. Angular injects the singleton MessageService into that property
   * when it creates the HeroService.
   *
   * This is an example of a typical service-in-service scenario in which you
   * inject the MessageService into the HeroService which is injected into the
   * HeroesComponent.
   */
  constructor(private messageService: MessageService,
              private http: HttpClient) {

  }

  /**
   * get heroes from the server
   */
  getHeroes() : Observable<Hero[]> {
    // return HEROES
    // of() creates an observable from a data.
    /*
    const heroes = of(HEROES)
    this.messageService.add('HeroService: fetched heroes');
    return heroes;
    */
    return this.http.get<Hero[]>(this.heroesUrl)
      // extend the observable result with the pipe()
      // method and give it a catchError() operator.
      .pipe(
        // The RxJS tap() operator enables this ability by looking at the
        // observable values, doing something with those values, and passing
        // them along. Here we just log info.
        tap(_ => this.log('fetched heroes')),
        // The catchError() operator intercepts an Observable that failed.
        // The operator then passes the error to the error handling function.
        catchError(this.handleError<Hero[]>('getHeroes', []))
      )
  }

  getHero(id: number): Observable<Hero> {
    // For now, assume that a hero with the specified `id` always exists.
    // Error handling will be added in the next step of the tutorial.
    // ! here is to tell TypeScript that we are certain that hero is non null.
    /*
    const hero = HEROES.find(h => h.id === id)!;
    this.messageService.add(`HeroService: fetched hero id=${id}`);
    return of(hero);
    */

    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url)
      .pipe(
        tap(_ => this.log(`fetched hero id=${id}`)),
        catchError(this.handleError<Hero>(`getHero id=${id}`))
      );
  }

  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`)
  }

  /**
   * The following handleError() can be shared by many HeroService methods
   * so it's generalized to meet their different needs.
   *
   * Instead of handling the error directly, it returns an error handler
   * function to catchError. This function is configured with both the name
   * of the operation that failed and a safe return value.
   *
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * Because each service method returns a different kind of Observable result,
   * handleError() takes a type parameter to return the safe value as the type
   * that the application expects.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any) : Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
      // Let the app keep running by returning an empty result.
      // After reporting the error to the console, the handler constructs a
      // friendly message and returns a safe value so the application can
      // keep working.
      return of(result as T);
    }

  }

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }

  /** PUT: update the hero on the server */
  updateHero(hero: Hero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, this.httpOptions)
      .pipe(
        tap(_ => this.log(`update hero id=${hero.id}`)),
        catchError(this.handleError<any>('updateHero'))
      );

  }

  /** POST: add a new hero to the server */
  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions)
      .pipe(
        tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
        catchError(this.handleError<Hero>('addHero'))
    );
  }

  /** DELETE: delete the hero from the server */
  deleteHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;

    return this.http.delete<Hero>(url, this.httpOptions)
      .pipe(
        tap(_ => this.log(`deleted hero id=${id}`)),
        catchError(this.handleError<Hero>('deleteHero'))
    );
  }

  /* GET heroes whose name contains search term */
  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`)
      .pipe(
        tap(x => x.length ?
          this.log(`found heroes matching "${term}"`) :
          this.log(`no heroes matching "${term}"`)),
        catchError(this.handleError<Hero[]>('searchHeroes', []))
      );
  }
}
