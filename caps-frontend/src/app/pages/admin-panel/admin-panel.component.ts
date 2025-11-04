import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PedidoService } from '../../services/pedido.service';
import { ContactoService } from '../../services/contacto.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {
  pedidos: any[] = [];
  mensajes: any[] = [];

  constructor(
    private pedidoService: PedidoService,
    private contactoService: ContactoService
  ) {}

  ngOnInit(): void {
    this.cargarPedidos();
    this.cargarMensajes();
  }

  // 🧢 Pedidos
  cargarPedidos(): void {
    this.pedidoService.obtenerPedidos().subscribe({
      next: (data) => this.pedidos = data,
      error: (err) => console.error('Error al obtener pedidos:', err)
    });
  }

  actualizarEstadoPedido(pedido: any, nuevoEstado: string): void {
    this.pedidoService.actualizarEstadoPedido(pedido.id, nuevoEstado).subscribe({
      next: () => {
        pedido.estado = nuevoEstado;
        alert(`✅ Pedido marcado como "${nuevoEstado}"`);
      },
      error: (err: any) => {
        console.error('Error al actualizar estado del pedido:', err);
        alert('❌ Error al actualizar pedido');
      }
      
    });
  }

  // 💬 Mensajes de contacto
  cargarMensajes(): void {
    this.contactoService.obtenerMensajes().subscribe({
      next: (data) => this.mensajes = data,
      error: (err) => console.error('Error al obtener mensajes:', err)
    });
  }

  modoClaro = false;

  alternarModo(): void {
  this.modoClaro = !this.modoClaro;
  }


  marcarRespondido(mensaje: any): void {
    this.contactoService.actualizarEstado(mensaje.id, 'respondido').subscribe({
      next: () => {
        mensaje.estado = 'respondido';
        alert('📨 Mensaje marcado como respondido');
      },
      error: (err) => {
        console.error('Error al actualizar mensaje:', err);
        alert('❌ Error al actualizar mensaje');
      }
    });
  }
}


