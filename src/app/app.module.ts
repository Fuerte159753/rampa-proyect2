import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from '@angular/forms'
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { ClienteComponent } from './cliente/cliente.component';
import { CallcenterComponent } from './callcenter/callcenter.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { InfocliComponent } from './admin/infocli/infocli.component';
import { ViewadminComponent } from './admin/viewadmin/viewadmin.component';
import { DeudasComponent } from './admin/deudas/deudas.component';
import { UsuariosComponent } from './admin/usuarios/usuarios.component';
import { PerfilComponent } from './admin/perfil/perfil.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminComponent,
    ClienteComponent,
    CallcenterComponent,
    NotfoundComponent,
    InfocliComponent,
    ViewadminComponent,
    DeudasComponent,
    UsuariosComponent,
    PerfilComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatSlideToggleModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
