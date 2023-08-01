import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";
import {HeroService} from "../hero.service";
import { Hero } from "../hero";

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit{
  /**
   * @Input() and @Output() give a child component a way to communicate with its parent component.
   * @Input() lets a parent component update data in the child component.
   * Conversely, @Output() lets the child send data to a parent component.
   * https://angular.io/guide/inputs-outputs
   *
   * Note that this field was used in earlier classes. Later, we don't need to pass a hero from
   * parent to this child anymore, and instead we get it from the heroService.
   */
  //@Input() hero?: Hero

  hero: Hero | undefined;

  /**
   *
   * @param route  The ActivatedRoute holds information about the route to
   * this instance of the HeroDetailComponent.
   * This component is interested in the route's parameters extracted from the URL.
   * The "id" parameter is the id of the hero to display.
   * @param heroService
   * @param location The location is an Angular service for interacting with the browser.
   * This service lets you navigate back to the previous view.
   */
  constructor(private route: ActivatedRoute,
              private heroService: HeroService,
              private location: Location) {
      // these params are injectable, and injected by angular.
  }

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
    // The route.snapshot is a static image of the route information shortly
    // after the component was created.
    // The paramMap is a dictionary of route parameter values extracted from the URL.
    // The "id" key returns the id of the hero to fetch.
    // Route parameters are always strings. The JavaScript Number function converts
    // the string to a number, which is what a hero id should be.
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.heroService
      .getHero(id)
      .subscribe(hero => this.hero = hero)
  }

  /**
   * Calling this to go back to prev URL.
   */
  goBack() {
    this.location.back();
  }

  save(): void {
    if (this.hero) {
      this.heroService.updateHero(this.hero)
        .subscribe(() => this.goBack());
    }
  }
}
