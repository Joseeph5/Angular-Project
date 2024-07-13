import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:9100/auth';

  public userSubject: BehaviorSubject<any> = new BehaviorSubject(null);
  public user: Observable<any> = this.userSubject.asObservable();

  constructor(private http: HttpClient) {}

  isAdmin(): boolean {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user && user.roles && user.roles.includes('ROLE_ADMIN');
  }

  loginUser(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials).pipe(
      tap((response) => {
        if (response.token) {
          localStorage.setItem('token', response.token);
          localStorage.setItem('userId', response.id);
          this.userSubject.next(response);
        }
      }),
      catchError((error) => {
        console.error('Login error:', error);
        return of(null);
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.userSubject.next(null);
  }

  registerUser(user: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register-user`, user).pipe(
      catchError((error) => {
        console.error('Registration error:', error);
        return of(null);
      })
    );
  }

  handleLogin() {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedUser = jwtDecode(token);
      this.userSubject.next(decodedUser);
    }
  }

  getUser(email: string, token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`http://localhost:9100/users/${email}`, { headers });
  }

  deleteUser(userId: string): Observable<any> {
    return this.http.delete(`http://localhost:9100/users/delete/${userId}`);
  }
}
