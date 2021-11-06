import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  constructor(public http: HttpClient) { }

  public get(url: string, options?): Observable<any> {
    let subj = new Subject<any>();

    this.http.get(url, options).pipe(take(1)).subscribe((res) => {
      subj.next(res);
      subj.complete();
    },
      (err: HttpErrorResponse) => {
        this.getRetry(err, subj, url, options);
      });

    return subj.asObservable();
  }
  private getRetry(err: HttpErrorResponse, subj: Subject<any>, url: string, options?) {
    if (err.status == 500) {
      this.http.get(url, options).pipe(take(1)).subscribe((res) => {
        subj.next(res);
        subj.complete();
      }, (err: HttpErrorResponse) => {
        console.error(err);
        subj.error(err);
        subj.complete();
      });
    } else {
      console.error(err);
      subj.error(err);
      subj.complete();
    }
  }

  public post(url: string, body: any | null, options?: any): Observable<any> {
    let subj = new Subject<any>();

    this.http.post(url, body, options).pipe(take(1)).subscribe((res) => {
      subj.next(res);
      subj.complete();
    }, (err: HttpErrorResponse) => {
      this.postRetry(err, subj, url, body, options);
    });

    return subj.asObservable();
  }

  public postRetry(err: HttpErrorResponse, subj: Subject<any>, url: string, body: any | null, options?: any) {
    if (err.status == 500) {
      this.http.post(url, body, options).pipe(take(1)).subscribe((res) => {
        subj.next(res);
        subj.complete();
      }, (err: HttpErrorResponse) => {
        subj.error(err);
        subj.complete();
      });
    }
  }
}




