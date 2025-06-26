import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';

@Component({
  selector: 'app-card',
  imports: [NgTemplateOutlet],
  template: `
    @if (small()) {
      <div class="p-2">
        <ng-container [ngTemplateOutlet]="titleTmpl" />
        <ng-container [ngTemplateOutlet]="bodyTmpl" />
      </div>
    } @else {
      <div class="p-4">
        <div class="text-2xl">
          <ng-container [ngTemplateOutlet]="titleTmpl" />
        </div>
        <ng-container [ngTemplateOutlet]="bodyTmpl" />
      </div>
    }

    <ng-template #titleTmpl>
      <ng-content select="[title]" />
    </ng-template>
    <ng-template #bodyTmpl>
      <ng-content select="[message]" />
    </ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'p-4 border border-grey rounded-sm flex flex-col w-[200px]',
  },
})
export class CardComponent implements OnInit {
  small = input<boolean>(false);

  private viewContainerRef = inject(ViewContainerRef);
  viewRef = input<TemplateRef<any> | null>(null);

  ngOnInit(): void {
    if (this.viewRef()) {
      this.viewContainerRef.createEmbeddedView(this.viewRef()!);
    }
  }
}
