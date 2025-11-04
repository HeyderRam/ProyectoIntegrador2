import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PedidoService } from '../../services/pedido.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-pedidos',
  standalone: true,
  templateUrl: './admin-pedidos.component.html',
  styleUrls: ['./admin-pedidos.component.css'],
  imports: [CommonModule, FormsModule]
})
export class AdminPedidosComponent implements OnInit {
  pedidos: any[] = [];

  constructor(private pedidoService: PedidoService) {}

  ngOnInit(): void {
    this.cargarPedidos();
  }

  cargarPedidos(): void {
    this.pedidoService.obtenerPedidos().subscribe({
      next: (data) => {
        this.pedidos = data;
      },
      error: (err) => {
        console.error('Error al obtener pedidos:', err);
      }
    });
  }

  actualizarEstado(id: number, nuevoEstado: string): void {
    this.pedidoService.actualizarEstadoPedido(id, nuevoEstado).subscribe({
      next: () => {
        const pedido = this.pedidos.find(p => p.id === id);
        if (pedido) pedido.estado = nuevoEstado;
        alert(`✅ Estado actualizado a "${nuevoEstado}"`);
      },
      error: (err) => {
        console.error('Error al actualizar estado:', err);
        alert('❌ Error al actualizar estado del pedido');
      }
    });
  }

  parseProductos(productos: string): any[] {
    try {
      return JSON.parse(productos);
    } catch (e) {
      return [];
    }
  }
}
