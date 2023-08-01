import { Component, OnInit } from '@angular/core';
import {Hero} from "../hero";
import {HeroService} from "../hero.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];

  constructor(private heroService: HeroService) {
    // auto injection of heroService by angular here
  }

  ngOnInit(): void {
    // It is best practice to call getHeroes() here inside this ngOnInit().
    // Avoid calling this inside constructor.
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes().subscribe(
      // pretend that slice(1,5) returns the top heroes.
      heroes => this.heroes = heroes.slice(1,5)
    );
  }

}
