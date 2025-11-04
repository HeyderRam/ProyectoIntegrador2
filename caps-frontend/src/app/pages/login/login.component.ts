import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  usuario = '';
  contrasena = '';
  mensaje = '';

  constructor(private auth: AuthService, private router: Router) {}

  iniciarSesion() {
    this.auth.login(this.usuario, this.contrasena).subscribe({
      next: (res) => {
        if (res.autenticado) {
          localStorage.setItem('admin', 'true');
          this.router.navigate(['/admin-panel']);
        } else {
          this.mensaje = 'Credenciales incorrectas';
        }
      },
      error: () => {
        this.mensaje = 'Error al conectar con el servidor';
      }
    });
  }
}
