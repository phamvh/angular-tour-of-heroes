import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // This class doesn't contain much info, because we can use the components, which are declared in
  // app.module.ts, in the app.component.html template.
  title = 'Tour of heroes';
}
