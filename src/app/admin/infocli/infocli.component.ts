import {Component} from '@angular/core';
import {MatPaginatorModule} from '@angular/material/paginator';
import { Router } from '@angular/router';
import { OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-infocli',
  templateUrl: './infocli.component.html',
  styleUrls: ['./infocli.component.css']
})
export class InfocliComponent implements OnInit{
  clientes: any[] = [];
  terminoBusqueda: string = '';
  filtroBusqueda: string = ''
  selectedClientId: number | null = null;

  organizacion: string = '';
  name: string = '';
  apellido: string = '';
  mail: string = '';
  phone: string = '';
  password: string = '';

  // Propiedades para edición
  editOrganizacion: string = '';
  editName: string = '';
  editApellido: string = '';
  editMail: string = '';
  editPhone: string = '';
  editPassword: string = '';

  seleccliente: string ='';
  selecname: string='';

  constructor(private router: Router, private authService: AuthService) {}
  ngOnInit(): void {
    this.filtroBusqueda = 'nombre'
    this.obtenerClientes();
    setInterval(() => {
      this.obtenerClientes();
    }, 60000);
  }
  obtenerClientes() {
    if (this.terminoBusqueda.trim() === '') {
      this.authService.obtenerClientes().subscribe(
        (response) => {
          this.clientes = response;
        },
        (error) => {
          console.error('Error al obtener la lista de clientes', error);
        }
      );
    } else {
      this.authService.buscarClientes(this.terminoBusqueda, this.filtroBusqueda).subscribe(
        (response) => {
          if (response.length === 0) {
            Swal.fire({
              icon: 'info',
              title: 'Cliente no encontrado',
              text: 'No se encontraron clientes con el ' + this.filtroBusqueda + ' proporcionado.'
            });
          } else {
            this.clientes = response;
          }
        },
        (error) => {
          console.error('Error al realizar la búsqueda de clientes', error);
        }
      );
    }
  }
  realizarBusqueda() {
    this.obtenerClientes();
  }

  editcliente(clienteId: number) {
    const cliente = this.clientes.find(cliente => cliente.id === clienteId);
    if (cliente) {

      this.selectedClientId = clienteId;

      this.editOrganizacion = cliente.empresa;
      this.editName = cliente.nombre;
      this.editApellido = cliente.apellido;
      this.editMail = cliente.correo;
      this.editPhone = cliente.telefono;
      this.editPassword = cliente.password;
    } else {
      console.error('Cliente no encontrado');
    }
  }

  submitEditForm() {
    if (!this.selectedClientId) {
      console.error('Cliente no seleccionado');
      return;
    }

    const cliente = this.clientes.find(cliente => cliente.id === this.selectedClientId);
    if (!cliente) {
      console.error('Cliente no encontrado');
      return;
    }
    if (this.areEqual(cliente, this.editOrganizacion, this.editName, this.editApellido, this.editMail, this.editPhone, this.editPassword)) {
      Swal.fire({
        icon: 'warning',
        title: 'Los datos deben ser distintos a los anteriores'
      });
    } else {
      // Enviar los datos editados al servicio
      const formData = new FormData();
      formData.append('organizacion', this.editOrganizacion);
      formData.append('name', this.editName);
      formData.append('apellido', this.editApellido);
      formData.append('mail', this.editMail);
      formData.append('phone', this.editPhone);
      formData.append('password', this.editPassword);

      const clienteId = this.selectedClientId; // Obtener el ID del cliente seleccionado
      this.authService.editarCliente(clienteId, formData).subscribe(
        (response) => {
          // Mostrar alerta de éxito
          Swal.fire({
            icon: 'success',
            title: 'Cliente actualizado exitosamente'
          });

          this.obtenerClientes();
          const closeButton = document.getElementById('closeEditModalButton');
        if (closeButton) {
          closeButton.click();
        }
        },
        (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Error al actualizar el cliente',
            text: 'Ocurrió un error al actualizar el cliente. Por favor, inténtalo de nuevo más tarde.'
          });
          console.error('Error al actualizar el cliente', error);
        }
      );
    }
  }
  areEqual(editCliente: any, empresa: string, name: string, apellido: string, mail: string, phone: string, password: string): boolean {
    return (
      editCliente.empresa === empresa &&
      editCliente.nombre === name &&
      editCliente.apellido === apellido &&
      editCliente.correo === mail &&
      editCliente.telefono === phone &&
      editCliente.password === password
    );
  }

  submitForm() {
    if (!this.organizacion || !this.name || !this.apellido || !this.mail || !this.phone || !this.password) {
      Swal.fire({
        icon: 'error',
        title: 'Campos Vacíos',
        text: 'Por favor, completa todos los campos antes de enviar el formulario.'
      });
      return;
    }
    console.log('submitForm llamado');

    const formData = new FormData();
    formData.append('organizacion', this.organizacion);
    formData.append('name', this.name);
    formData.append('apellido', this.apellido);
    formData.append('mail', this.mail);
    formData.append('phone', this.phone);
    formData.append('password', this.password);

    this.authService.registroCliente(formData).subscribe(
      (response) => {
        // Muestra una alerta basada en la respuesta
        if (response.status === 'success') {
          Swal.fire({
            icon: 'success',
            title: 'Registro Exitoso',
          });
          const modal = document.getElementById('modalregistro');
          if (modal) {
            modal.classList.remove('show');
            modal.style.display = 'none';
          }
          this.organizacion = '';
          this.name = '';
          this.apellido = '';
          this.mail = '';
          this.phone = '';
          this.password = '';
          this.obtenerClientes();
          const closeButtonr = document.getElementById('closeModalregistro');
        if (closeButtonr) {
          closeButtonr.click();
        }
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error al Registrar',
            text: response.message
          });
        }
        console.log('Respuesta del servidor:', response);
      },
      (error) => {
        // Muestra una alerta de error
        Swal.fire({
          icon: 'error',
          title: 'Error al Registrar',
          text: 'Ocurrió un error al registrar. Por favor, inténtalo de nuevo más tarde.'
        });
        console.error('Error al registrar', error);
      }
    );
  }


  eliminarCliente(clienteId: number) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Se eliminara el cliente de manera definitiva',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, estoy seguro',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.authService.eliminarCliente(clienteId).subscribe(
          () => {
            Swal.fire(
              '¡Eliminado!',
              'El cliente ha sido eliminado correctamente.',
              'success'
            );
            this.obtenerClientes();
          },
          (error) => {
            // Lógica para manejar el error de la eliminación...
            Swal.fire(
              'Error',
              'Hubo un problema al intentar eliminar el cliente.',
              'error'
            );
          }
        );
      }
    });
  }
}
