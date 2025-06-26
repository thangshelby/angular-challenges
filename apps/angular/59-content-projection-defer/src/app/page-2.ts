import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { ExpandableCard } from './expandable-card';
interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

@Component({
  selector: 'app-page-2',
  template: `
    page2
    <button
      #trigger
      class="text-fg-subtle hover:bg-button-secondary-bg-hover active:bg-button-secondary-bg-active focus:outline-button-border-highlight flex w-fit items-center gap-1 py-2 focus:outline focus:outline-2 focus:outline-offset-1"
      (click)="isExpanded.set(!isExpanded())"
      data-cy="expandable-panel-toggle">
      @if (isExpanded()) {
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="h-4 w-4">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="m19.5 8.25-7.5 7.5-7.5-7.5" />
        </svg>
      } @else {
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="h-4 w-4">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="m8.25 4.5 7.5 7.5-7.5 7.5" />
        </svg>
      }
      Load Post
    </button>

    @defer (when isExpanded()) {
      <app-expandable-card [isExpanded]="isExpanded()"></app-expandable-card>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ExpandableCard],
})
export class Page2 {
  public isExpanded = signal(false);
}
