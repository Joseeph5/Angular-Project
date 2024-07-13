import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-bookings-table',
  standalone: true,
  templateUrl: './bookings-table.component.html',
  styleUrls: ['./bookings-table.component.css'],
  imports: [CommonModule, FormsModule],
})
export class BookingsTableComponent implements OnChanges {
  @Input() bookingInfo: any[] = [];
  @Output() bookingCancellation = new EventEmitter<string>();

  handleBookingCancellation(bookingId: string): void {
    this.bookingCancellation.emit(bookingId);
  }

  filteredBookings: any[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['bookingInfo']) {
      this.filteredBookings = this.bookingInfo;
    }
  }

  filterBookings(startDate: Date, endDate: Date): void {
    if (startDate && endDate) {
      this.filteredBookings = this.bookingInfo.filter((booking) => {
        const bookingStartDate = new Date(booking.checkInDate);
        const bookingEndDate = new Date(booking.checkOutDate);
        return (
          bookingStartDate >= startDate &&
          bookingEndDate <= endDate &&
          bookingEndDate > startDate
        );
      });
    } else {
      this.filteredBookings = this.bookingInfo;
    }
  }
}
