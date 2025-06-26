import {
  ChangeDetectionStrategy,
  Component,
  NO_ERRORS_SCHEMA,
} from '@angular/core';
import { CardComponent } from './card.component';

// NO_ERRORS_SCHEMA allows the use of custom elements and attributes without Angular throwing errors.

@Component({
  imports: [CardComponent],
  selector: 'app-root',
  schemas: [NO_ERRORS_SCHEMA],
  standalone: true,
  template: `
    <app-card>
      <card-title>Titre 1</card-title>
      <card-message>Message 1</card-message>
    </app-card>
    <app-card>
      <card-title>Titre 2</card-title>
      <card-message>Message 2</card-message>
    </app-card>
  `,
  host: {
    class: 'p-4 block flex flex-col gap-1',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}
