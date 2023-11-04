import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost/rampa/conSesion.php';

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    const data = { email, password };
    return this.http.post<any>(`${this.apiUrl}/login`, data);
  }
}
