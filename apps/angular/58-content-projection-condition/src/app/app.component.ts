import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { CardComponent } from './card.component';

@Component({
  imports: [CardComponent, NgTemplateOutlet],
  selector: 'app-root',
  template: `
    <ng-template #myRef>This is testing ng-template</ng-template>

    <app-card>
      <div title>Card 1</div>
      <div message>Message 1</div>
    </app-card>
    <app-card [small]="true">
      <div title>Card 2</div>
      <div message>Message 2</div>
      weqew
    </app-card>
  `,
  host: {
    class: 'p-4 block flex flex-col gap-1',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  count = 0;

  @ViewChild('myRef', { read: TemplateRef }) templateRef!: TemplateRef<any>;
}
