import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private isRefreshing = false;
  private refreshSubject = new BehaviorSubject<string | null>(null);

  constructor(private http: HttpClient) {}

  getAccessToken() {
    return localStorage.getItem('access_token');
  }

  setAccessToken(token: string) {
    localStorage.setItem('access_token', token);
  }

  getRefreshToken() {
    return localStorage.getItem('refresh_token');
  }

  logout() {
    localStorage.clear();
    window.location.href = '/login';
  }

  refreshToken() {
    const refreshToken = this.getRefreshToken();
    return this.http.post<{ access_token: string }>('/api/auth/refresh', {
      refresh_token: refreshToken
    }).pipe(
      tap(res => {
        this.setAccessToken(res.access_token);
      })
    );
  }

  get refreshState$() {
    return this.refreshSubject.asObservable();
  }

  setRefreshing(value: boolean) {
    this.isRefreshing = value;
  }

  get refreshing() {
    return this.isRefreshing;
  }

  publishNewToken(token: string) {
    this.refreshSubject.next(token);
  }
}
