import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface VicidialUser {
  user: string;
  pass: string;
}

@Injectable({
  providedIn: 'root'
})
export class VicidialUserService {
  private baseUrl = 'http://localhost:8000'; // Ton URL backend Symfony

  constructor(private http: HttpClient) {}

  createUser(user: VicidialUser): Observable<any> {
    return this.http.post(`${this.baseUrl}/userCreate`, user);
  }

  getAllUsers(): Observable<any> {
    return this.http.get(`${this.baseUrl}/getAllUsers`);
  }
}
