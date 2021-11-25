import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import Result from '../../shared/result';
import { ResultService } from '../../services/result.service';

@Component({
  selector: 'app-result-search',
  templateUrl: './result-search.component.html',
})
export class ResultSearchComponent implements OnInit {
  error?: string;
  result?: Result;

  form: FormGroup = new FormGroup({
    dob: new FormControl('', [Validators.required]),
    rollno: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]*$'),
    ]),
  });

  constructor(private resultService: ResultService) {}

  ngOnInit(): void {}

  get dob() {
    return this.form.get('dob')!;
  }

  get rollno() {
    return this.form.get('rollno')!;
  }

  closeError() {
    delete this.error;
  }

  back() {
    delete this.result;
  }

  reset() {
    this.form.reset();
  }

  submit() {
    if (this.form.invalid) return;
    this.resultService
      .searchResult(this.rollno.value, this.dob.value)
      .subscribe({
        next: (result) => {
          this.result = result;
        },
        error: (err) => {
          this.error = err.error.message;
        },
      });
  }
}
