import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactoService } from '../../services/contacto.service';
import { FormsModule } from '@angular/forms';

interface Mensaje {
  id: number;
  nombre: string;
  correo: string;
  mensaje: string;
  estado: string;
}

@Component({
  selector: 'app-admin-contacto',
  standalone: true,
  templateUrl: './admin-contacto.component.html',
  styleUrls: ['./admin-contacto.component.css'],
  imports: [CommonModule, FormsModule],
})
export class AdminContactoComponent implements OnInit {
  mensajes: Mensaje[] = [];
  cargando = false;
  errorCarga: string | null = null;

  constructor(private contactoService: ContactoService) {}

  ngOnInit(): void {
    this.cargarMensajes();
  }

  cargarMensajes(): void {
    this.cargando = true;
    this.errorCarga = null;
    this.contactoService.obtenerMensajes().subscribe({
      next: (data: any[]) => {
        // normalizar la respuesta a nuestro tipo
        this.mensajes = (data ?? []).map((m: any) => ({
          id: m.id,
          nombre: m.nombre,
          correo: m.correo,
          mensaje: m.mensaje,
          estado: m.estado ?? 'pendiente'
        }));
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error al obtener mensajes:', err);
        this.errorCarga = 'No se pudo cargar la lista de mensajes.';
        this.cargando = false;
      }
    });
  }

  marcarRespondido(m: Mensaje): void {
    // confirmar acción con el admin
    const ok = confirm(`Marcar mensaje de "${m.nombre}" como respondido?`);
    if (!ok) return;

    // enviar petición al backend
    this.contactoService.actualizarEstado(m.id, 'respondido').subscribe({
      next: () => {
        // actualizar estado localmente para evitar recargar la lista
        m.estado = 'respondido';
        alert('✅ Mensaje marcado como respondido');
      },
      error: (err) => {
        console.error('Error al actualizar estado del mensaje:', err);
        alert('❌ Error al actualizar el estado del mensaje');
      }
    });
  }

  // método auxiliar por si quieres volver a cargar manualmente
  recargar(): void {
    this.cargarMensajes();
  }
}
