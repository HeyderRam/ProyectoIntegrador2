import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://127.0.0.1:5000/api/login';

  constructor(private http: HttpClient) {}

  login(usuario: string, contrasena: string): Observable<any> {
    return this.http.post(this.apiUrl, { usuario, contrasena });
  }
}
