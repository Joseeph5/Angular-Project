import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  FaIconLibrary,
  FontAwesomeModule,
} from '@fortawesome/angular-fontawesome';
import {
  faUtensils,
  faWifi,
  faTv,
  faWineGlassAlt,
  faParking,
  faCar,
  faTshirt,
} from '@fortawesome/free-solid-svg-icons';
import { RoomService } from '../../../services/room.service';
import { RoomCarouselComponent } from '../../../components/room-carousel/room-carousel.component';
import { BookingFormComponent } from '../../../components/booking-form/booking-form.component';

@Component({
  selector: 'app-book-room',
  standalone: true,
  templateUrl: './book-room.component.html',
  styleUrl: './book-room.component.css',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    RoomCarouselComponent,
    BookingFormComponent,
  ],
})
export class BookRoomComponent {
  error: string | null = null;
  isLoading: boolean = true;
  roomInfo = {
    photo: '',
    roomType: '',
    roomPrice: '',
  };

  constructor(
    private route: ActivatedRoute,
    private roomService: RoomService,
    private library: FaIconLibrary
  ) {
    this.library.addIcons(
      faUtensils,
      faWifi,
      faTv,
      faWineGlassAlt,
      faParking,
      faCar,
      faTshirt
    );
  }

  ngOnInit(): void {
    const roomId = this.route.snapshot.paramMap.get('roomId');
    if (roomId) {
      setTimeout(() => {
        this.roomService.getRoomById(roomId).subscribe({
          next: (response: any) => {
            this.roomInfo = response;
            this.isLoading = false;
          },
          error: (error: any) => {
            this.error = error.message;
            this.isLoading = false;
          },
        });
      }, 1000);
    }
  }
}
