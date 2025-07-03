import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, take } from 'rxjs';
import { TopicModalComponent } from './topic-dialog.component';
import { TopicService, TopicType } from './topic.service';

@Component({
  selector: 'app-root',
  template: `
    <button (click)="openTopicModal()">Open Topic</button>

    <button (click)="addTopic()">Add topic</button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  title = 'rxjs-race-condition';
  dialog = inject(MatDialog);
  topicService = inject(TopicService);
  topics: TopicType[] = [];
  topics$ = new BehaviorSubject<TopicType[]>([]);

  ngOnInit(): void {
    this.topicService
      .fakeGetHttpTopic()
      .pipe(take(1))
      .subscribe((topics) => {
        this.topics = topics;
        this.topics$.next(topics);
      });
  }

  openTopicModal() {
    this.dialog.open(TopicModalComponent, {
      data: {
        topics$: this.topics$,
      },
    });
  }
  addTopic() {
    this.topics.push('Culture');
    this.topics$.next(this.topics);
  }
}
