import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { apiurls } from '../api.urls';
import { BehaviorSubject, catchError, Observable, throwError } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private http = inject(HttpClient);

  getBooks(): Observable<Response<Book[]>> {
    return this.http.get<Response<Book[]>>('http://localhost:3000/api/book').pipe(
      catchError(this.handleError) // Catching errors
    );
  }

  private handleError(error: any) {
    if (error.status === 429) {
      alert('Too many requests! Please try again after a minute.');
    } else {
      alert('Something went wrong! Please try again later.');
    }
    return throwError(() => error);
  }

}

export type Book = {
  _id: string;
  title: string;
  isbn13: string;
  price: string;
  image: string;
  url: string;
  __v: number;
};

export type Response<T> = {
  success: boolean;
  status: number;
  message: string;
  data: T;
};
