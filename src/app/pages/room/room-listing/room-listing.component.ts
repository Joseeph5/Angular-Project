import { Component } from '@angular/core';
import { RoomService } from '../../../services/room.service';
import { RoomFilterComponent } from '../../../components/room-filter/room-filter.component';
import { RoomPaginatorComponent } from '../../../components/room-paginator/room-paginator.component';
import { RoomCardComponent } from '../../../components/room-card/room-card.component';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-room-listing',
  standalone: true,
  imports: [
    RoomFilterComponent,
    RoomPaginatorComponent,
    RoomCardComponent,
    NgFor,
  ],
  templateUrl: './room-listing.component.html',
  styleUrl: './room-listing.component.css',
})
export class RoomListingComponent {
  data: any[] = [];
  filteredData: any[] = [];
  error: string | null = null;
  isLoading = false;
  currentPage = 1;
  roomsPerPage = 5;
  totalPages = 1;

  constructor(private roomService: RoomService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.isLoading = true;
    this.roomService.getAllRooms().subscribe({
      next: (data) => {
        this.data = data;
        const startIndex = (this.currentPage - 1) * this.roomsPerPage;
        const endIndex = startIndex + this.roomsPerPage;
        this.totalPages = Math.ceil(this.data.length / this.roomsPerPage);
        this.filteredData = data;
      },
      error: (error) => {
        this.error = error.message;
      },
    });
  }

  handlePageChange(pageNumber: any): void {
    this.currentPage = pageNumber;
  }

  setFilteredData(event: any) {
    this.totalPages = Math.ceil(event.length / this.roomsPerPage);
    this.filteredData = event;
  }

  get paginateData() {
    const startIndex = (this.currentPage - 1) * this.roomsPerPage;
    const endIndex = startIndex + this.roomsPerPage;
    const result = this.filteredData.slice(startIndex, endIndex);
    return result;
  }
}
