import { httpResource } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ResourceStatus,
} from '@angular/core';

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

@Component({
  selector: 'app-expandable-card',
  template: `
    <div
      class="overflow-hidden transition-[max-height] duration-500"
      [class.max-h-0]="!isExpanded"
      [class.max-h-[1000px]]="isExpanded">
      <div>
        @if (postResource.isLoading()) {
          Loading...
        } @else if (postResource.status() === ResourceStatus.Error) {
          Error...
        } @else {
          @for (post of postResource.value(); track post.id) {
            <div>{{ post.title }}</div>
          }
        }
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'flex flex-col gap-2 ',
  },
})
export class ExpandableCard {
  public postResource = httpResource<Post[]>(
    'https://jsonplaceholder.typicode.com/posts',
  );
  protected readonly ResourceStatus = ResourceStatus;

  @Input() isExpanded!: boolean;
}
