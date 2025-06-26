import { Component } from '@angular/core';
import { WrapFncPipe } from './wrapFnc.pipe';

@Component({
  selector: 'app-root',
  imports: [WrapFncPipe],
  template: `
    <div style="{display:flex;}" class="flex flex-col gap-3  p-4">
      @for (person of persons; track person.name) {
        <div class="mt-1">
          {{ person | wrapFnc: $index }}
        </div>
      }
    </div>
  `,
})
export class AppComponent {
  persons = [
    { name: 'Toto', age: 10 },
    { name: 'Jack', age: 15 },
    { name: 'John', age: 30 },
  ];
}
