import { NgModule } from '@angular/core';
// Add this so the application can have routing capability.
import {RouterModule, Routes} from "@angular/router";
import {HeroesComponent} from "./heroes/heroes.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {HeroDetailComponent} from "./hero-detail/hero-detail.component";
import {SupermanFormComponent} from "./superman-form/superman-form.component";

// HeroesComponent, gives the Router somewhere to go once you configure the routes.
const routes: Routes = [
  {path: 'heroes', component: HeroesComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'superman', component: SupermanFormComponent},
  // add a parameterized route for hero detail
  // The colon : character in the path indicates that :id is a placeholder
  // for a specific hero id
  {path: 'detail/:id', component: HeroDetailComponent},
  // add a default route
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
];


@NgModule({
  declarations: [],
  imports: [
    // The method is called forRoot() because you configure the router at the application's
    // root level. The forRoot() method supplies the service providers and directives
    // needed for routing, and performs the initial navigation based on the current
    // browser URL.
    RouterModule.forRoot(routes)
  ],
  // Next, AppRoutingModule exports RouterModule to be available throughout the application.
  exports: [RouterModule]
})
export class AppRoutingModule { }
