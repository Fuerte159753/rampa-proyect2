//modulos para exportar
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';


import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { CallcenterComponent } from './callcenter/callcenter.component';
import { ClienteComponent } from './cliente/cliente.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { InfocliComponent } from './admin/infocli/infocli.component';
import { ViewadminComponent } from './admin/viewadmin/viewadmin.component';
import { DeudasComponent } from './admin/deudas/deudas.component';
import { UsuariosComponent } from './admin/usuarios/usuarios.component';
import { PerfilComponent } from './admin/perfil/perfil.component';

//rutas
const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent},
  { path: 'admin', component: AdminComponent, children: [
    //rutas hijas admin
    { path: '', component: ViewadminComponent},
    { path: 'home', component: ViewadminComponent},
    { path: 'informacion-cliente', component: InfocliComponent },
    { path: 'deudas', component: DeudasComponent},
    { path: 'usuarios', component: UsuariosComponent},
    { path: 'perfil', component: PerfilComponent},
  ]},
  { path: 'callcenter', component: CallcenterComponent, children:[
    //Rutas hijas callcenter
  ] },
  { path: 'cliente', component: ClienteComponent, children:[
    //Rutas hijas cliente
  ] },
  { path: '**', component: NotfoundComponent },
];
/*
const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard], children: [
    // Rutas hijas admin
    { path: '', component: ViewadminComponent },
    { path: 'home', component: ViewadminComponent },
    { path: 'informacion-cliente', component: InfocliComponent },
    { path: 'deudas', component: DeudasComponent },
    { path: 'usuarios', component: UsuariosComponent },
    { path: 'perfil', component: PerfilComponent },
  ]},
  { path: 'callcenter', component: CallcenterComponent, canActivate: [AuthGuard], children:[
    // Rutas hijas callcenter
  ] },
  { path: 'cliente', component: ClienteComponent, canActivate: [AuthGuard], children:[
    // Rutas hijas cliente
  ] },
  { path: '**', component: NotfoundComponent },
];*/

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
