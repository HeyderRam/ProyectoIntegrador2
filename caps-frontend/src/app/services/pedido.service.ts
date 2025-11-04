import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CartItem } from './cart.service';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  private apiUrl = 'http://127.0.0.1:5000/api/pedidos';

  constructor(private http: HttpClient) {}

  crearPedido(nombre: string, correo: string, direccion: string, productos: CartItem[], total: number): Observable<any> {
    const pedido = { nombre, correo, direccion, productos, total, fecha: new Date() };
    return this.http.post(this.apiUrl, pedido);
  }

  obtenerPedidos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  actualizarEstadoPedido(id: number, nuevoEstado: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, { estado: nuevoEstado });
  }
}
