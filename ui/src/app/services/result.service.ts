import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import Result from '../shared/result';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class ResultService {
  private endpoint = 'http://localhost:3000/api/v1/results';

  constructor(private http: HttpClient, private authService: AuthService) {}

  deleteResult(rollno: number) {
    return this.http.delete(`${this.endpoint}/delete/${rollno}`, {
      headers: {
        authorization: this.authService.token!,
      },
    });
  }

  editResult(rollno: number, result: Result) {
    return this.http.patch(`${this.endpoint}/edit/${rollno}`, result, {
      headers: {
        authorization: this.authService.token!,
      },
    });
  }

  searchResult(rollno: string, dob: string) {
    const params = new HttpParams().set('rollno', rollno).set('dob', dob);
    return this.http.get<Result>(`${this.endpoint}/search`, {
      params,
      headers: {
        authorization: this.authService.token!,
      },
    });
  }

  getResult(rollno: string) {
    return this.http.get<Result>(`${this.endpoint}/detail/${rollno}`, {
      headers: {
        authorization: this.authService.token!,
      },
    });
  }

  addResult(result: Result) {
    return this.http.post(`${this.endpoint}/add`, result, {
      headers: {
        authorization: this.authService.token!,
      },
    });
  }

  getResults() {
    return this.http.get<Result[]>(`${this.endpoint}/list`, {
      headers: {
        authorization: this.authService.token!,
      },
    });
  }
}
