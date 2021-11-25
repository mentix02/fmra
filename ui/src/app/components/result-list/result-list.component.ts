import { Component, OnInit } from '@angular/core';

import Result from '../../shared/result';
import { ResultService } from '../../services/result.service';

@Component({
  selector: 'app-result-list',
  templateUrl: './result-list.component.html',
})
export class ResultListComponent implements OnInit {
  results: Result[] = [];

  constructor(private resultService: ResultService) {}

  ngOnInit(): void {
    this.resultService.getResults().subscribe((results) => {
      this.results = results;
    });
  }

  deleteResult(rollno: number) {
    this.resultService.deleteResult(rollno).subscribe(() => {
      this.results = this.results.filter((result) => result.rollno !== rollno);
    });
  }
}
