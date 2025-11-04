import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactoService {
  private apiUrl = 'http://127.0.0.1:5000/api/contacto';

  constructor(private http: HttpClient) {}

  enviarMensaje(nombre: string, correo: string, mensaje: string): Observable<any> {
    return this.http.post(this.apiUrl, { nombre, correo, mensaje });
  }

  obtenerMensajes(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  actualizarEstado(id: number, estado: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, { estado });
  }
}
