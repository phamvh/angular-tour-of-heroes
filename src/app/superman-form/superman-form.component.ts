import { Component } from '@angular/core';
import {Superman} from "./superman";

@Component({
  selector: 'app-superman-form',
  templateUrl: './superman-form.component.html',
  styleUrls: ['./superman-form.component.css']
})
export class SupermanFormComponent {
    powers  =['Really Smart', 'Super Flexible',
      'Super Hot', 'Weather Changer'];

    model = new Superman(18, 'Dr. IQ', this.powers[0], 'Chuck Overstreet');

    submitted = false;

    onSubmit() {
       this.submitted = true;
    }

    newSuperman() {
      this.model = new Superman(42, '', '');
    }

    skyDog(): Superman {
      const mySuperman = new Superman(42, 'SkyDog',
        'Fetch any object at any distance',
        'Leslie Rollover');
      console.log('My superman is called ' + mySuperman.name); // "My hero is called SkyDog"
      return mySuperman;
    }

    //////// NOT SHOWN IN DOCS ////////

    // Reveal in html:
    //   Name via form.controls = {{showFormControls(heroForm)}}
  showFormControls(form: any) {
      return form &&
        form.controls.name &&
        form.controls.name.value; // Dr. IQ
  }
  }
