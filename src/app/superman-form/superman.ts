/**
 * This class is just a rename of Hero from a different example hero-form.
 * See here: https://angular.io/guide/forms
 *
 */
export class Superman {
  constructor(
    public id: number,
    public name: string,
    public power: string,
    public alterEgo?: string
  ) {
  }
}
