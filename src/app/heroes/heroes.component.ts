import { Component, OnInit } from '@angular/core';
import { Hero} from "../hero";
import {HeroService} from "../hero.service";
import {MessageService} from "../message.service";

/**
 * @Component is a decorator function that specifies the Angular metadata for the component.
 * ng generate created three metadata properties: selector, templateUrl and styleUrls
 */

// This is a decorator (similar to Annotation in Java) that decorates class HeroesComponent.
@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes: Hero[] = [];
  // need to make this optional, because it is not init-ed in constructor
  // Well, there is no constructor for this clas anyway, so TS would complain if not optional.
  // This is no longer needed after code update in later classes. Keep here for references.
  selectedHero?: Hero;

  /**
   * TypeScript provides a convenient way to define class members in the constructor,
   * by adding a visibility modifiers (private, public...) to the parameter.
   * https://www.w3schools.com/typescript/typescript_classes.php
   * The parameter simultaneously defines a private heroService property and identifies
   * it as a HeroService injection site.
   *
   * When Angular creates a HeroesComponent, the Dependency Injection system sets
   * the heroService parameter to the singleton instance of HeroService.
   */
  constructor(private heroService: HeroService,
              private messageService: MessageService) {
  }

  /**
   *  call getHeroes() inside the ngOnInit lifecycle hook and let Angular call
   *  ngOnInit() at an appropriate time after constructing a HeroesComponent instance.
   *  Avoid calling this.getHeroes() within the constructor as a best practice.
   */
  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes() : void {
    // this.heroes = this.heroService.getHeroes();
    // Now, since heroService.getHeroes returns an observable, we need to use
    // subscribe() in order to react to it when data is ready (similar to callback)
    this.heroService
      .getHeroes()
      .subscribe(heroes => this.heroes = heroes)
  }

  /**
   * This is also no longer needed after updates in later classes.
   * Keep it here for references.
   * @param hero
   */
  onSelect(hero: Hero): void {
    this.selectedHero = hero;
    this.messageService.add(`HeroesComponent: Selected hero id=${hero.id}`)
  }


  /*
  hero = 'Windstorm';
  hero: Hero = {
    id: 1,
    name: 'Windstorm1'
  }
  */
  add(name: string): void {
    name = name.trim();
    if (!name) {return}
    this.heroService.addHero( {name} as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);
      })
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    // If you neglect to subscribe(), the service can't send the delete request
    // to the server.
    // As a rule, an Observable does nothing until something subscribes.
    this.heroService.deleteHero(hero.id).subscribe();
  }
}
