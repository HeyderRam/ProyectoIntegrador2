import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/cart.service';
import { PedidoService } from '../../services/pedido.service';

@Component({
  selector: 'app-carrito',
  standalone: true,
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css'],
  imports: [CommonModule, FormsModule]
})
export class CarritoComponent implements OnInit {
  productosCarrito: any[] = [];
  total = 0;

  nombre = '';
  correo = '';
  direccion = '';

  constructor(
    private cartService: CartService,
    private pedidoService: PedidoService
  ) {}

  ngOnInit(): void {
    this.cargarCarrito();
  }

  cargarCarrito(): void {
    this.productosCarrito = this.cartService.obtenerCarrito();
    this.calcularTotal();
  }

  eliminarProducto(index: number): void {
    this.cartService.eliminarProducto(index);
    this.cargarCarrito();
  }

  actualizarCantidad(index: number, event: any): void {
    const cantidad = Number(event.target.value);
    this.cartService.actualizarCantidad(index, cantidad);
    this.cargarCarrito();
  }

  calcularTotal(): void {
    this.total = this.productosCarrito.reduce(
      (acc, p) => acc + p.precio * (p.cantidad ?? 1),
      0
    );
  }

  finalizarPedido(): void {
    if (this.productosCarrito.length === 0) {
      alert('🛒 No hay productos en el carrito');
      return;
    }

    if (!this.nombre || !this.correo || !this.direccion) {
      alert('⚠️ Por favor completa todos los datos del pedido');
      return;
    }

    this.pedidoService
      .crearPedido(this.nombre, this.correo, this.direccion, this.productosCarrito, this.total)
      .subscribe({
        next: () => {
          alert('✅ Pedido guardado con éxito');
          this.cartService.vaciarCarrito();
          this.nombre = '';
          this.correo = '';
          this.direccion = '';
          this.cargarCarrito();
        },
        error: (err) => {
          console.error('Error al guardar el pedido', err);
          alert('❌ Error al guardar el pedido');
        }
      });
  }
}

