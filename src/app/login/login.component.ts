import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AppRoutingModule } from '../app-routing.module';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  hidePassword: boolean = true;

  constructor(private authService: AuthService, private router: Router) {}

  togglePassword(isMouseDown: boolean): void {
    if (isMouseDown) {
      this.hidePassword = false;
    } else {
      this.hidePassword = true;
    }
  }

  login(): void {
    this.authService.login(this.email, this.password).subscribe(
      response => {
        console.log('Respuesta del servidor:', response);
        const tipeuser = response.tipeuser;
        if (tipeuser == 0) {
          //página del administrador
          this.router.navigate(['/admin'])
          //window.location.href = '/admin';
        } else if (tipeuser == 1) {
          //página del callcenter
          this.router.navigate(['/callcenter']);
        } else if (tipeuser == 2) {
          //página del cliente
          this.router.navigate(['/cliente']);
        } else {
          console.error('Tipo de usuario no válido:', tipeuser);
        }
      },
      error => {
        console.error('Error al iniciar sesión:', error);
      }
    );
  }
}
