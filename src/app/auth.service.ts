import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiadmin = 'http://localhost/rampa';
/*            api's pagina clientes                        */
  private apilogin = `${this.apiadmin}/conSesion.php/`;
  private clirog = `${this.apiadmin}/nuevocliente.php`;
  private apiobtener = `${this.apiadmin}/generar_tabla.php`;
  private apisearch = `${this.apiadmin}/busqueda_cliente.php`;
  private apiEditarCliente = `${this.apiadmin}/editar_cliente.php`;
  private eliminarUrl = `${this.apiadmin}/eliminar_cliente.php`;
/*             api's  pagina deudas            */
  private deudasUrl = `${this.apiadmin}/obtener_deudas.php`;
  private verNotaUrl = `${this.apiadmin}/ver_nota.php`;
  private verhistori = `${this.apiadmin}/ver_histori.php`;
  private newdeuda = `${this.apiadmin}/new_deuda.php`;
  private eliminardeuda = `${this.apiadmin}/eliminar_deuda.php`;


  // variable de inicio de sesion
  private loggedIn: boolean = false;

  constructor(private http: HttpClient) { }
  login(email: string, password: string): Observable<any> {
    const data = { email, password };
    return this.http.post<any>(this.apilogin, data)
      .pipe(
        tap(() => this.loggedIn = true)
      );
  }
  eliminarCliente(clienteId: number): Observable<any> {
    const url = `${this.eliminarUrl}?id=${clienteId}`;
    return this.http.delete<any>(url);
  }
  logout(): void {
    this.loggedIn = false;
  }
  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  registroCliente(formData: FormData): Observable<any> { return this.http.post<any>(this.clirog, formData); }
  obtenerClientes(): Observable<any[]> { return this.http.get<any[]>(`${this.apiobtener}`); }
  buscarClientes(termino: string, filtro: string): Observable<any[]> {
    const params = new HttpParams()
      .set('termino', termino)
      .set('filtro', filtro);
    return this.http.post<any[]>(`${this.apisearch}`, params);
  }
  editarCliente(clienteId: number, formData: FormData): Observable<any> {
    const url = `${this.apiEditarCliente}?id=${clienteId}`; return this.http.post<any>(url, formData).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Error desconocido';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Código: ${error.status}, Mensaje: ${error.message}`;
    }
    return throwError(errorMessage);
  }
  /* -------------------------------------------------- */
  obtenerDeudas(): Observable<any[]> {return this.http.get<any[]>(this.deudasUrl);}
  verNota(folio: number): Observable<any> {return this.http.post<any>(this.verNotaUrl, { folio: folio });}
  verHistorial(folio: number): Observable<any> {return this.http.post<any>(this.verhistori, {folio:folio});}
  agregarDeuda(nuevaDeuda: any): Observable<any> {return this.http.post<any>(this.newdeuda, nuevaDeuda).pipe(
      catchError(this.handleError));}
  eliminarDeuda(folio: number): Observable<any> {const url = `${this.eliminardeuda}?id=${folio}`; return this.http.delete<any>(url);}
}
