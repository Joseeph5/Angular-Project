import { Component } from '@angular/core';
import { RoomService } from '../../../services/room.service';
import { RoomFilterComponent } from '../../../components/room-filter/room-filter.component';
import { RoomPaginatorComponent } from '../../../components/room-paginator/room-paginator.component';

@Component({
  selector: 'app-room-listing',
  standalone: true,
  imports: [RoomFilterComponent, RoomPaginatorComponent],
  templateUrl: './room-listing.component.html',
  styleUrl: './room-listing.component.css',
})
export class RoomListingComponent {
  data: any[] = [];
  filteredData: any[] = [];
  error: string | null = null;
  isLoading = false;
  currentPage = 1;
  roomsPerPage = 6;

  constructor(private roomService: RoomService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.isLoading = true;
    this.roomService.getAllRooms().subscribe({
      next: (data) => {
        this.data = data;
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

  get totalPages(): number {
    return Math.ceil(this.filteredData.length / this.roomsPerPage);
  }

  get startIndex(): number {
    return (this.currentPage - 1) * this.roomsPerPage;
  }

  get endIndex(): number {
    return this.startIndex + this.roomsPerPage;
  }

  setFilteredData(event: any) {
    this.data = event;
  }
}
