import { switchMap } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import Result from '../../shared/result';
import { ResultService } from '../../services/result.service';

@Component({
  selector: 'app-result-edit',
  templateUrl: './result-edit.component.html',
})
export class ResultEditComponent implements OnInit {
  error?: string;
  result$?: Result;

  _form?: FormGroup;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private resultService: ResultService
  ) {
    this._form = new FormGroup({
      dob: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      score: new FormControl('', [
        Validators.required,
        Validators.max(600),
        Validators.pattern('^[0-9]*$'),
      ]),
    });
  }

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        switchMap((params: ParamMap) =>
          this.resultService.getResult(params.get('rollno')!)
        )
      )
      .subscribe({
        next: (result: Result) => {
          this.result$ = result;
          this.form.get('name')!.setValue(result.name);
          this.form.get('score')!.setValue(result.score);
          this.form
            .get('dob')!
            .setValue(new Date(result.dob).toISOString().split('T')[0]);
        },
        error: (err: Error) => {
          this.router.navigate(['/404']);
        },
      });
  }

  get form() {
    return this._form!;
  }

  get name() {
    return this.form.get('name')!;
  }

  get dob() {
    return this.form.get('dob')!;
  }

  set dob(val) {
    this.form.get('dob')!.setValue(val);
  }

  get score() {
    return this.form.get('score')!;
  }

  closeError() {
    delete this.error;
  }

  reset() {
    this.form.reset();
  }

  submit() {
    if (this.form.invalid) {
      this.error = 'Please input required fields with valid values.';
      return;
    }

    this.resultService
      .editResult(this.result$?.rollno!, this.form.value)
      .subscribe({
        next: () => {
          this.router.navigate(['results/list']);
        },
        error: (err) => {
          this.error = err.error.message;
        },
      });
  }
}
