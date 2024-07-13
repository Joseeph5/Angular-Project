import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingService } from '../../../services/booking.service';
import { BookingsTableComponent } from '../../../components/bookings-table/bookings-table.component';

@Component({
  selector: 'app-existing-bookings',
  standalone: true,
  templateUrl: './existing-bookings.component.html',
  styleUrl: './existing-bookings.component.css',
  imports: [CommonModule, BookingsTableComponent],
})
export class ExistingBookingsComponent implements OnInit {
  bookingInfo: any[] = [];
  isLoading = true;
  error = '';

  constructor(private bookingService: BookingService) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token') || '';
    setTimeout(() => {
      this.bookingService.getAllBookings(token).subscribe({
        next: (data) => {
          this.bookingInfo = data;
          this.isLoading = false;
        },
        error: (error) => {
          this.error = error.message;
          this.isLoading = false;
        },
      });
    }, 1000);
  }

  handleBookingCancellation(bookingId: string): void {
    const token = localStorage.getItem('token') || '';
    this.bookingService.cancelBooking(bookingId, token).subscribe({
      next: () => {
        this.bookingService.getAllBookings(token).subscribe((data) => {
          this.bookingInfo = data;
        });
      },
      error: (error) => {
        this.error = error.message;
      },
    });
  }
}
