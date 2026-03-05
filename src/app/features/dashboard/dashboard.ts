import { Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-dashboard',
  imports: [MatSidenavModule, MatFormFieldModule, MatSelectModule, MatButtonModule, MatIcon],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {}
