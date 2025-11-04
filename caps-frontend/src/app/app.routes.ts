import { Routes } from '@angular/router';
import { CatalogoComponent } from './pages/catalogo/catalogo.component';
import { CarritoComponent } from './pages/carrito/carrito.component';
import { PedidosComponent } from './pages/pedidos/pedidos.component';
import { AdminPedidosComponent } from './pages/admin-pedidos/admin-pedidos.component';
import { AdminContactoComponent } from './pages/admin-contacto/admin-contacto.component';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { LoginComponent } from './pages/login/login.component';
import { AdminPanelComponent } from './pages/admin-panel/admin-panel.component';

export const routes: Routes = [
  { path: '', redirectTo: 'catalogo', pathMatch: 'full' },
  { path: 'catalogo', component: CatalogoComponent },
  { path: 'carrito', component: CarritoComponent },
  { path: 'pedidos', component: PedidosComponent },
  { path: 'admin-pedidos', component: AdminPedidosComponent },
  { path: 'contacto', component: ContactoComponent },
  { path: 'admin-contacto', component: AdminContactoComponent },
  { path: 'login', component: LoginComponent },
  { path: 'admin-panel', component: AdminPanelComponent },
];


