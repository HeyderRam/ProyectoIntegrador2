import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ContactoService } from '../../services/contacto.service';

@Component({
  selector: 'app-contacto',
  standalone: true,
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css'],
  imports: [CommonModule, FormsModule]
})
export class ContactoComponent {
  nombre = '';
  correo = '';
  mensaje = '';
  respuesta = '';

  constructor(private contactoService: ContactoService) {}

  enviar(): void {
    this.contactoService.enviarMensaje(this.nombre, this.correo, this.mensaje).subscribe({
      next: () => {
        this.respuesta = '✅ Mensaje enviado correctamente';
        this.nombre = '';
        this.correo = '';
        this.mensaje = '';
      },
      error: (err) => {
        console.error('Error al enviar mensaje:', err);
        this.respuesta = '❌ Error al enviar mensaje';
      }
    });
  }
}
