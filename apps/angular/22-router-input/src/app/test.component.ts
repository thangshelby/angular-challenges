import { AsyncPipe } from '@angular/common';
import { Component, inject, OnInit, Input as RouterInput } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'app-subscription',
  imports: [AsyncPipe],
  template: `
    <div>TestId: {{ testId$ | async }}</div>
    <div>Permission: {{ permission$ | async }}</div>
    <div>User: {{ user$ | async }}</div>
  `,
})
export default class TestComponent implements OnInit {
  private activatedRoute = inject(ActivatedRoute);

  @RouterInput() testId!: number;
  @RouterInput() user!: string;
  @RouterInput() permission!: string;

  ngOnInit() {
    console.log(console.log(this.testId, this.user, this.permission));
  }

  testId$ = this.activatedRoute.params.pipe(map((p) => p['testId']));
  permission$ = this.activatedRoute.data.pipe(map((d) => d['permission']));
  user$ = this.activatedRoute.queryParams.pipe(map((q) => q['user']));
}
