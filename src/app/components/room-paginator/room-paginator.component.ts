import { NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-room-paginator',
  templateUrl: './room-paginator.component.html',
  styleUrls: ['./room-paginator.component.css'],
  standalone: true,
  imports: [NgFor],
})
export class RoomPaginatorComponent {
  @Input() currentPage: number = 1;
  @Input() totalPages: number = 1;
  @Input() pageChange: Function | undefined;

  getPageNumbers(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }
}
