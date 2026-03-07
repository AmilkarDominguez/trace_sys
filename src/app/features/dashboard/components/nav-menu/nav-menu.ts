import { Component } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface NavItem {
  label: string;
  icon: string;
  route: string;
}

interface NavModule {
  title: string;
  icon: string;
  items: NavItem[];
}

@Component({
  selector: 'app-nav-menu',
  imports: [MatListModule, MatIconModule, MatDividerModule, MatExpansionModule, RouterLink, RouterLinkActive],
  templateUrl: './nav-menu.html',
  styleUrl: './nav-menu.scss',
})
export class NavMenu {
  readonly modules: NavModule[] = [
    {
      title: 'Catálogos y Configuración',
      icon: 'menu_book',
      items: [
        { label: 'Ganaderos', icon: 'person', route: '/dashboard/catalogos/ganaderos' },
        { label: 'Marcas', icon: 'label', route: '/dashboard/catalogos/marcas' },
        { label: 'Razas', icon: 'pets', route: '/dashboard/catalogos/razas' },
        { label: 'Sexo', icon: 'wc', route: '/dashboard/catalogos/sexo' },
        { label: 'Transportistas', icon: 'local_shipping', route: '/dashboard/catalogos/transportistas' },
        { label: 'Cámaras de Frío', icon: 'ac_unit', route: '/dashboard/catalogos/camaras' },
        { label: 'Corrales', icon: 'fence', route: '/dashboard/catalogos/corrales' },
        { label: 'Usuarios', icon: 'manage_accounts', route: '/dashboard/catalogos/usuarios' },
        { label: 'Roles', icon: 'admin_panel_settings', route: '/dashboard/catalogos/roles' },
      ],
    },
    {
      title: 'Recepción y Portería',
      icon: 'meeting_room',
      items: [
        { label: 'Guías de Movimiento', icon: 'description', route: '/dashboard/recepcion/guias' },
        { label: 'Lotes', icon: 'inventory_2', route: '/dashboard/recepcion/lotes' },
        { label: 'Novedades de Recepción', icon: 'report_problem', route: '/dashboard/recepcion/novedades' },
      ],
    },
    {
      title: 'Gestión de Corrales',
      icon: 'fence',
      items: [
        { label: 'Animales', icon: 'cruelty_free', route: '/dashboard/corrales/animales' },
        { label: 'Transferencias de Propiedad', icon: 'swap_horiz', route: '/dashboard/corrales/transferencias' },
      ],
    },
    {
      title: 'Producción (Faena)',
      icon: 'precision_manufacturing',
      items: [
        { label: 'Registros de Faena', icon: 'engineering', route: '/dashboard/produccion/faenas' },
        { label: 'Canales', icon: 'view_week', route: '/dashboard/produccion/canales' },
        { label: 'Etiquetas', icon: 'qr_code_2', route: '/dashboard/produccion/etiquetas' },
        { label: 'Pesajes', icon: 'scale', route: '/dashboard/produccion/pesajes' },
      ],
    },
    {
      title: 'Inventario y Cámaras',
      icon: 'inventory',
      items: [
        { label: 'Ingresos a Cámara', icon: 'add_box', route: '/dashboard/inventario/ingresos' },
        { label: 'Control de Temperatura', icon: 'thermostat', route: '/dashboard/inventario/temperatura' },
      ],
    },
    {
      title: 'Despacho y Logística',
      icon: 'send',
      items: [
        { label: 'Órdenes de Despacho', icon: 'assignment', route: '/dashboard/despacho/ordenes' },
        { label: 'Detalles de Despacho', icon: 'list_alt', route: '/dashboard/despacho/detalles' },
        { label: 'Notas de Entrega', icon: 'receipt_long', route: '/dashboard/despacho/notas' },
      ],
    },
    {
      title: 'Auditoría y Reportes',
      icon: 'fact_check',
      items: [
        { label: 'Bitácora de Auditoría', icon: 'history', route: '/dashboard/auditoria/bitacora' },
        { label: 'Consulta de Trazabilidad', icon: 'travel_explore', route: '/dashboard/auditoria/trazabilidad' },
      ],
    },
  ];
}
