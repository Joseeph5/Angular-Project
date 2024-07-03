import { Component } from '@angular/core';
import { MainHeaderComponent } from '../../components/main-header/main-header.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MainHeaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
