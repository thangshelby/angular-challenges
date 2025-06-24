import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-list-item',
  standalone: true,
  template: `
    <div class="border-grey-300 flex justify-between border px-2 py-1">
      <
      <ng-content select="[selector]"></ng-content>
      <button (click)="delete.emit()">
        <img class="h-5" src="assets/svg/trash.svg" />
      </button>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListItemComponent {
  @Output() delete = new EventEmitter();
}
