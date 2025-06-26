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

// Vì sao?
// Angular chỉ project nội dung (<ng-content>) một lần duy nhất, vào đúng vị trí trong template mà nó thấy đầu tiên trong quá trình biên dịch. Nếu bạn đặt <ng-content> trong các nhánh @if, Angular có thể bỏ qua việc chiếu nội dung, hoặc chiếu sai, tùy thuộc vào ngữ cảnh và phiên bản Angular.

// Đúng rồi, bạn hiểu chính xác: Angular chỉ xử lý (project) nội dung vào <ng-content> một lần duy nhất trong vòng đời của component, tại thời điểm render ban đầu.

// Nếu bạn muốn điều kiện hóa việc chiếu nội dung, bạn cần sử dụng các kỹ thuật khác như ng-template hoặc ng-container để kiểm soát việc hiển thị nội dung mà không làm ảnh hưởng đến quá trình chiếu nội dung ban đầu.
