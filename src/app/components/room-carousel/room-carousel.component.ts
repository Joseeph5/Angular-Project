import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { RoomService } from '../../services/room.service';

@Component({
  selector: 'app-room-carousel',
  standalone: true,
  imports: [CommonModule, RouterModule, CarouselModule],
  templateUrl: './room-carousel.component.html',
  styleUrls: ['./room-carousel.component.css'],
})
export class RoomCarouselComponent implements OnInit {
  rooms: Array<{
    id: string;
    roomType: string;
    roomPrice: string;
    photo: string;
  }> = [];
  errorMessage = '';
  isLoading = false;

  constructor(private roomService: RoomService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.roomService.getAllRooms().subscribe({
      next: (data) => {
        this.rooms = data;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Error : Error fetching rooms';
        this.isLoading = false;
      },
    });
  }
}
