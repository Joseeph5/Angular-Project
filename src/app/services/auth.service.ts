import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:9100/auth';

  constructor(private http: HttpClient) {}

  loginUser(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials).pipe(
      tap((response) => {
        if (response.token) {
          localStorage.setItem('token', response.token);
        }
      }),
      catchError((error) => {
        console.error('Login error:', error);
        return of(null);
      })
    );
  }

  handleLogin(token: string) {
    localStorage.setItem('token', token);
  }
}
