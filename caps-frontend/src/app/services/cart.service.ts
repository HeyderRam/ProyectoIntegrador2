// src/app/services/cart.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface CartItem {
  id?: number;
  nombre: string;
  precio: number;
  imagen?: string;
  categoria?: string;
  cantidad?: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private carrito: CartItem[] = [];
  private carritoCountSubject = new BehaviorSubject<number>(0);
  carritoCount$ = this.carritoCountSubject.asObservable();

  constructor() {
    const saved = localStorage.getItem('carrito');
    if (saved) {
      try {
        this.carrito = JSON.parse(saved);
      } catch {
        this.carrito = [];
      }
    }
    this.emitCount(); // ✅ actualizar el contador al iniciar
  }

  private persist(): void {
    localStorage.setItem('carrito', JSON.stringify(this.carrito));
    this.emitCount();
  }

  private emitCount(): void {
    const count = this.carrito.reduce((sum, it) => sum + (it.cantidad ?? 1), 0);
    this.carritoCountSubject.next(count);
  }

  // ✅ agregar producto al carrito
  agregarProducto(producto: CartItem): void {
    const idx = producto.id != null
      ? this.carrito.findIndex(p => p.id === producto.id)
      : this.carrito.findIndex(p => p.nombre === producto.nombre);

    if (idx >= 0) {
      this.carrito[idx].cantidad = (this.carrito[idx].cantidad ?? 1) + 1;
    } else {
      this.carrito.push({ ...producto, cantidad: producto.cantidad ?? 1 });
    }
    this.persist();
  }

  obtenerCarrito(): CartItem[] {
    return this.carrito.map(p => ({ ...p }));
  }

  eliminarProducto(index: number): void {
    if (index >= 0 && index < this.carrito.length) {
      this.carrito.splice(index, 1);
      this.persist();
    }
  }

  actualizarCantidad(index: number, cantidad: number): void {
    if (index >= 0 && index < this.carrito.length) {
      this.carrito[index].cantidad = Math.max(1, cantidad);
      this.persist();
    }
  }

  vaciarCarrito(): void {
    this.carrito = [];
    this.persist();
  }

  getTotal(): number {
    return this.carrito.reduce(
      (sum, p) => sum + p.precio * (p.cantidad ?? 1),
      0
    );
  }
}



