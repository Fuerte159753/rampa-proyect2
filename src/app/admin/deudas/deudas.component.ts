import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-deudas',
  templateUrl: './deudas.component.html',
  styleUrls: ['./deudas.component.css']
})
export class DeudasComponent implements OnInit {
  deudas: any[] = [];
  notas: any[] = [];
  historial: any[] = [];
  nombresClientes: string[] = [];
  nombreClienteInput: string = '';
  clientes: any[] = [];
  clientesFiltrados: any[] = [];
  empresaInput: string = '';
  mostrarListaClientes: boolean = false;

  fechaInicioInput: string = '';
  fechaVencimientoInput: string = '';
  montoInput: string = '';

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.obtenerDeudas();
    this.historial = [];
    this.notas = [];
  }
  obtenerDeudas(): void {
    this.authService.obtenerDeudas().subscribe(
      (data) => {
        this.deudas = data;
      },
      (error) => {
        console.error('Error al obtener las deudas', error);
      }
    );
  }
  vernotas(folio: number): void {
    this.authService.verNota(folio).subscribe(
      (notas) => {
        this.notas = notas;
      },
      (error) => {
        console.error('Error al obtener las notas:', error);
      }
    );
  }
  verhistorial(folio: number): void{
    this.authService.verHistorial(folio).subscribe(
      (historial) =>{
        this.historial = historial;
      },
      (error)=>{
        console.error('error al obtener el historial:', error);
      }
    );
  }
  obtenerclientes() {
    this.authService.obtenerClientes().subscribe(
      (clientes) => {
        this.clientes = clientes;
      },
      (error) => {
        console.error('Error al obtener los nombres de los clientes:', error);
      }
    );
  }
  filtrarClientes() {
    if (this.nombreClienteInput) {
      this.mostrarListaClientes = true;
      this.clientesFiltrados = this.clientes.filter(cliente =>
        `${cliente.nombre} ${cliente.apellido}`.toLowerCase().includes(this.nombreClienteInput.toLowerCase())
      );
    } else {
      this.mostrarListaClientes = false;
      this.clientesFiltrados = [];
    }
  }
  clienteSeleccionadoId: string = '';
  seleccionarCliente(cliente: any) {
    this.clienteSeleccionadoId = cliente.id;
    this.nombreClienteInput = `${cliente.nombre} ${cliente.apellido}`;
    this.empresaInput = cliente.empresa;
    this.mostrarListaClientes = false;
  }
  nuevadeuda() {
    if (!this.validarFormulario()) {
      console.error('Formulario inválido. Por favor, complete todos los campos.');
      return;
    }
    const formData = new FormData();
    formData.append('cliente', this.clienteSeleccionadoId);
    formData.append('fechaInicio', this.fechaInicioInput);
    formData.append('fechaVencimiento', this.fechaVencimientoInput);
    formData.append('monto', this.montoInput);

    this.authService.agregarDeuda(formData).subscribe(
      (response) => {
        if (response.success) {
          Swal.fire({
            icon: 'success',
            title: '¡Éxito!',
            text: response.message
          }).then((result) => {
            if (result.isConfirmed) {
              this.limpiarFormulario();
            }
          });
          const closeButton = document.getElementById('closemodalagregar');
        if (closeButton) {
          closeButton.click();
          this.obtenerDeudas();
        }
        } else {
          Swal.fire({
            icon: 'error',
            title: '¡Error!',
            text: response.message
          });
        }
      },
      (error) => {
        console.error('Error al agregar la deuda:', error);
      }
    );
  }
  validarFormulario(): boolean {
    return !!this.nombreClienteInput && !!this.empresaInput && !!this.fechaInicioInput && !!this.fechaVencimientoInput && !!this.montoInput;
  }

  limpiarFormulario() {
    this.nombreClienteInput = '';
    this.empresaInput = '';
    this.fechaInicioInput = '';
    this.fechaVencimientoInput = '';
    this.montoInput = '';
  }
  eliminarDeuda(folio: number) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Se eliminará la deuda por completo',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, estoy seguro',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.authService.eliminarDeuda(folio).subscribe(
          (response) => {
            if (response.status === 'success') {
              Swal.fire(
                '¡Eliminado!',
                'La deuda ha sido eliminada correctamente',
                'success'
              );
              this.obtenerDeudas();
            } else {
              Swal.fire(
                'Error',
                response.message || 'Hubo un problema al intentar eliminar la deuda.',
                'error'
              );
            }
          },
          (error) => {
            Swal.fire(
              'Error',
              'Hubo un problema al intentar eliminar la deuda.',
              'error'
            );
          }
        );
      }
    });
  }
  editardeuda(){
    
  }
}
