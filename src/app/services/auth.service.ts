import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:8000/api';
  private role: string | null = null;
  private userId: number | null = null;

  constructor(private http: HttpClient, private router: Router) {}

  login(credentials: { user: string; pass: string }): Observable<{ token: string; refresh_token: string }> {
    return this.http.post<{ token: string; refresh_token: string }>(
      `${this.apiUrl}/login_check`,
      credentials,
      { headers: new HttpHeaders({'Content-Type': 'application/json'}), withCredentials: true }
    ).pipe(
      tap(res => {
        this.saveToken(res.token);
        this.saveRefreshToken(res.refresh_token);
  
        // 👇 Décode et affiche le payload du JWT dans la console
        if (res.token) {
          try {
            const payload = JSON.parse(atob(res.token.split('.')[1]));
            console.log('Payload JWT:', payload);
          } catch (e) {
            console.error('Erreur décodage JWT:', e);
          }
        }
  
        this.router.navigate(['/agenda']);
      }),
      
      catchError(err => {
        console.error('Login failed', err);
        return throwError(() => err);
      })
    );
  }
  

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  saveRefreshToken(refreshToken: string) {
    localStorage.setItem('refresh_token', refreshToken);
  }

  getRefreshToken(): string | null {
    return localStorage.getItem('refresh_token');
  }
  getUsernameFromToken(): string | null {
    const token = this.getToken();
    if (!token) return null;
  
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      console.log('Payload JWT:', payload);
      return payload.username ?? null;
    } catch (e) {
      console.error('JWT decode error', e);
      return null;
    }
  }
  isLoggedIn(): boolean {
    const token = this.getToken();
    if (!token) return false;
  
    // Optionnel : vérifier l’expiration du token JWT
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp * 1000 > Date.now();
  }
  


  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('refresh_token');
    this.router.navigate(['/login']);
  }

  refreshToken(): Observable<{ token: string }> {
    const refreshToken = this.getRefreshToken();
    if (!refreshToken) return throwError(() => new Error('No refresh token'));
    return this.http.post<{ token: string }>(
      `${this.apiUrl}/api_refresh_token`,
      { refresh_token: refreshToken },
      { headers: new HttpHeaders({'Content-Type': 'application/json'}), withCredentials: true }
    ).pipe(
      tap(res => this.saveToken(res.token))
    );
  }

  setUser(user: { id: number, role: string }) {
    this.userId = user.id;
    this.role = user.role;
    localStorage.setItem('role', user.role);
  }

  getRole(): string | null { return this.role; }
  isAdmin(): boolean { return this.role === 'ROLE_ADMIN'; }
  getUserId(): number | null { return this.userId; }

}
