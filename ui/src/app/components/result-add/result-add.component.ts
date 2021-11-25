import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ResultService } from '../../services/result.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-result-add',
  templateUrl: './result-add.component.html',
})
export class ResultAddComponent implements OnInit {
  error?: string;

  form: FormGroup = new FormGroup({
    dob: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    score: new FormControl('', [
      Validators.required,
      Validators.max(600),
      Validators.pattern('^[0-9]*$'),
    ]),
    rollno: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]*$'),
    ]),
  });

  constructor(private router: Router, private resultService: ResultService) {}

  ngOnInit(): void {}

  get name() {
    return this.form.get('name')!;
  }

  get dob() {
    return this.form.get('dob')!;
  }

  get rollno() {
    return this.form.get('rollno')!;
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

    this.resultService.addResult(this.form.value).subscribe({
      next: () => {
        this.router.navigate(['results/list']);
      },
      error: (err) => {
        this.error = err.error.message;
      },
    });
  }
}
