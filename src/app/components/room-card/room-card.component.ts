import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-room-card',
  templateUrl: './room-card.component.html',
  styleUrls: ['./room-card.component.css'],
  standalone: true,
  imports: [RouterLink, CommonModule],
})
export class RoomCardComponent {
  @Input() room: any;
}
