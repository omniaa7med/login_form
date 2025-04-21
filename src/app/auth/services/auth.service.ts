// auth.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, map } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private apiUrl = 'https://6806890be81df7060eb77cdf.mockapi.io/users';

  login(email: string, password: string): Observable<{ token: string }> {
    return this.http
      .get<any[]>(`${this.apiUrl}?email=${email}&password=${password}`)
      .pipe(
        map((users) => {
          const user = users[0];
          if (!user) throw new Error('Invalid credentials');
          localStorage.setItem('token', user.token);
          return { token: user.token };
        }),
        catchError((err) => {
          return throwError(() => new Error('Login failed'));
        })
      );
  }

  register(userData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, userData);
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }
}
