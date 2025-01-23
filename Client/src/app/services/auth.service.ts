import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { apiurls } from '../api.urls';
import { BehaviorSubject, catchError, Observable, throwError } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  platformId: any;
  http = inject(HttpClient);
  isLoggedIn$ = new BehaviorSubject<boolean>(this.isLoggedIn());

  resgisterService(registerObj: any): Observable<any> {
    return this.http.post<any>(
      `${apiurls.authServiceApi}register`,
      registerObj
    ).pipe(catchError(this.handleError))
  }

  loginService(loginObj: any): Observable<any> {
    return this.http.post<any>(
      `${apiurls.authServiceApi}login`,
      loginObj // { withCredentials: true, }
    ).pipe(catchError(this.handleError));
  }

  sendEmailService(email: string): Observable<any> {
    return this.http.post<any>(`${apiurls.authServiceApi}send-email`, {
      email: email,
    }).pipe(catchError(this.handleError));
  }

  ResetPasswordService(resetObj: {
    token: string;
    password: string;
  }): Observable<any> {
    return this.http.post<any>(
      `${apiurls.authServiceApi}reset-password`,
      resetObj
    ).pipe(catchError(this.handleError));
  }

  isLoggedIn(): boolean {
    if (typeof window !== 'undefined' && window.localStorage) {
      return !!localStorage.getItem('user_id');
    }
    return false;
  }

  logout(): void {
    localStorage.removeItem('user_id');
    this.isLoggedIn$.next(false);
  }

  private handleError(error: any) {
    if (error.status === 429) {
      // If rate limit is exceeded
      alert('Too many requests! Please try again after a minute.');
    } else {
      // Handle other types of errors
      alert('Something went wrong! Please try again later.');
    }
    return throwError(() => error); // Rethrow the error
  }

}
