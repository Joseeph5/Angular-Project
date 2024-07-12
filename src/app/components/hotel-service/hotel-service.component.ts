import { Component, OnInit } from '@angular/core';
import {
  faClock,
  faCocktail,
  faParking,
  faSnowflake,
  faTshirt,
  faUtensils,
  faWifi,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { RoomService } from '../../services/room.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-hotel-service',
  templateUrl: './hotel-service.component.html',
  styleUrls: ['./hotel-service.component.css'],
  standalone: true,
  imports: [FontAwesomeModule, NgFor],
})
export class HotelServiceComponent implements OnInit {
  faClock = faClock;
  services = [
    {
      title: 'WiFi',
      icon: faWifi,
      description: 'Stay connected with high-speed internet access.',
    },
    {
      title: 'Breakfast',
      icon: faUtensils,
      description: 'Start your day with a delicious breakfast buffet.',
    },
    {
      title: 'Laundry',
      icon: faTshirt,
      description:
        'Keep your clothes clean and fresh with our laundry service.',
    },
    {
      title: 'Mini-bar',
      icon: faCocktail,
      description:
        'Enjoy a refreshing drink or snack from our in-room mini-bar.',
    },
    {
      title: 'Parking',
      icon: faParking,
      description: 'Park your car conveniently in our on-site parking lot.',
    },
    {
      title: 'Air conditioning',
      icon: faSnowflake,
      description:
        'Stay cool and comfortable with our air conditioning system.',
    },
  ];

  constructor(private roomService: RoomService) {}

  ngOnInit(): void {
    // Example of fetching data from API
    this.roomService.getAllRooms().subscribe({
      next: (rooms) => {
        // Handle rooms data as needed
      },
      error: (error) => {
        console.error('Error fetching rooms:', error);
      },
    });
  }
}
