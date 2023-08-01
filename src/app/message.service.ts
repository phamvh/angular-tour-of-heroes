import { Injectable } from '@angular/core';

/**
 * This is all it takes to create a service. Everything is in this file.
 *
 * We inject this service into the HeroService.
 */
@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messages: string[] = [];

  //constructor() { }

  add(message: string) {
    this.messages.push(message);
  }

  clear() {
    this.messages = [];
  }
}
