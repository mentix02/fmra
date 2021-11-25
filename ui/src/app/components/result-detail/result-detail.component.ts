import { Component, Input, OnInit } from '@angular/core';

import Result from '../../shared/result';

@Component({
  selector: 'app-result-detail',
  templateUrl: './result-detail.component.html',
})
export class ResultDetailComponent implements OnInit {
  @Input() _result?: Result;

  constructor() {}

  ngOnInit(): void {}

  get result(): Result {
    return this._result!;
  }
}
