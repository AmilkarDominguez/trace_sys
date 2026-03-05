import { Component } from '@angular/core';
import { Dashboard } from '../../features/dashboard/dashboard';

@Component({
  selector: 'app-admin-layout',
  imports: [
    Dashboard
  ],
  templateUrl: './admin-layout.html',
  styleUrl: './admin-layout.scss',
})
export class AdminLayout {}
