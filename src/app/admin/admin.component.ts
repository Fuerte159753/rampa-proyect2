import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  nombreUsuario: string='Bienvenido';

  constructor(private route: ActivatedRoute, private router: Router, private authService: AuthService) {}
  cerrarSesion(): void {
    this.authService.logout();
  }

  ngOnInit() {
    // Suscribirse a los cambios en la ruta
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      // Verificar si hay una ruta activa y si tiene un primer hijo
      if (this.route.snapshot.firstChild) {
        // Obtener el segmento de la ruta activa
        const rutaActiva = this.route.snapshot.firstChild.routeConfig?.path || '';

        // Asignar el nombre de usuario según la ruta activa
        switch (rutaActiva) {
          case 'home': this.nombreUsuario = 'Bienvenido';
            break;
          case 'informacion-cliente': this.nombreUsuario = 'Clientes';
            break;
          case 'deudas': this.nombreUsuario = 'Bienvenido a Deudas';
            break;
          case 'usuarios': this.nombreUsuario = 'Bienvenido a Usuarios';
            break;
          case 'perfil': this.nombreUsuario = 'Hola';
            break;
          case '': this.nombreUsuario = 'bienvenido';
            break;
            default: this.nombreUsuario = 'Bienvenido';
        }
      }else{
        this.nombreUsuario = 'Bienvenido';
      }
    });
  }
}
