import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-room-filter',
  templateUrl: './room-filter.component.html',
  styleUrls: ['./room-filter.component.css'],
  standalone: true,
  imports:[FormsModule]
})
export class RoomFilterComponent {
  @Input() data: any[] = [];
  @Output() filteredData = new EventEmitter<any[]>();

  filter: string = '';

  handleSelectChange(selectedType: string): void {
    this.filter = selectedType;

    const filteredRooms = this.data.filter((room) =>
      room.roomType.toLowerCase().includes(selectedType.toLowerCase())
    );
    this.filteredData.emit(filteredRooms);
  }

  clearFilter(): void {
    this.filter = '';
    this.filteredData.emit(this.data);
  }

  get roomTypes(): string[] {
    return [...new Set(this.data.map((room) => room.roomType))];
  }
}
