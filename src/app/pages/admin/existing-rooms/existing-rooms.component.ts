import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import {
  FaIconLibrary,
  FontAwesomeModule,
} from '@fortawesome/angular-fontawesome';
import {
  faPlus,
  faEye,
  faEdit,
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';
import { RoomService } from '../../../services/room.service';

@Component({
  selector: 'app-existing-rooms',
  templateUrl: './existing-rooms.component.html',
  styleUrls: ['./existing-rooms.component.css'],
  standalone: true,
  imports: [RouterModule, CommonModule, ReactiveFormsModule, FontAwesomeModule],
})
export class ExistingRoomsComponent implements OnInit {
  rooms: any[] = [];
  filteredRooms: any[] = [];
  currentPage = 1;
  roomsPerPage = 8;
  isLoading = false;
  selectedRoomType = '';
  errorMessage = '';
  successMessage = '';

  faPlus = faPlus;
  faEye = faEye;
  faEdit = faEdit;
  faTrashAlt = faTrashAlt;

  constructor(private roomService: RoomService) {}

  ngOnInit(): void {
    this.fetchRooms();
  }

  fetchRooms(): void {
    this.isLoading = true;
    this.roomService.getAllRooms().subscribe({
      next: (rooms: any) => {
        this.rooms = rooms;
        this.filteredRooms = rooms;
        this.isLoading = false;
      },
      error: (error: any) => {
        this.errorMessage = error.message;
        this.isLoading = false;
      },
    });
  }

  onRoomTypeSelected(roomType: string): void {
    this.selectedRoomType = roomType;
    this.filterRooms();
    this.currentPage = 1;
  }

  filterRooms(): void {
    if (this.selectedRoomType === '') {
      this.filteredRooms = this.rooms;
    } else {
      this.filteredRooms = this.rooms.filter(
        (room) => room.roomType === this.selectedRoomType
      );
    }
  }

  handlePaginationClick(pageNumber: number): void {
    this.currentPage = pageNumber;
  }

  handleDelete(roomId: string): void {
    const token = localStorage.getItem('token') || '';
    this.roomService.deleteRoom(roomId, token).subscribe({
      next: () => {
        this.successMessage = `Room No ${roomId} was deleted`;
        this.fetchRooms();
      },
      error: (error: any) => {
        this.errorMessage = error.message;
      },
    });
    setTimeout(() => {
      this.successMessage = '';
      this.errorMessage = '';
    }, 3000);
  }

  calculateTotalPages(): number {
    const totalRooms =
      this.filteredRooms.length > 0
        ? this.filteredRooms.length
        : this.rooms.length;
    return Math.ceil(totalRooms / this.roomsPerPage);
  }

  getCurrentRooms(): any[] {
    // const indexOfLastRoom = this.currentPage * this.roomsPerPage;
    // const indexOfFirstRoom = indexOfLastRoom - this.roomsPerPage;
    // return this.filteredRooms.slice(indexOfFirstRoom, indexOfLastRoom);
    return this.filteredRooms;
  }
}
