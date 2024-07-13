import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import moment from 'moment';
import { CommonModule } from '@angular/common';
import { BookingService } from '../../../services/booking.service';

interface BookingInfo {
  id: string;
  bookingConfirmationCode: string;
  room: { id: string; roomType: string };
  roomNumber: string;
  checkInDate: string;
  checkOutDate: string;
  guestName: string;
  guestEmail: string;
  numOfAdults: string;
  numOfChildren: string;
  totalNumOfGuests: string;
}

@Component({
  selector: 'app-find-booking',
  templateUrl: './find-booking.component.html',
  styleUrls: ['./find-booking.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule], // Add necessary imports
})
export class FindBookingComponent {
  confirmationCodeForm: FormGroup;
  error: string | null = null;
  successMessage: string = '';
  isLoading: boolean = false;
  bookingInfo: BookingInfo | null = null;
  isDeleted: boolean = false;

  constructor(private fb: FormBuilder, private bookingService: BookingService) {
    this.confirmationCodeForm = this.fb.group({
      confirmationCode: [''],
    });
  }

  handleFormSubmit(): void {
    this.isLoading = true;
    const confirmationCode =
      this.confirmationCodeForm.get('confirmationCode')?.value;

    this.bookingService
      .getBookingByConfirmationCode(confirmationCode)
      .pipe(
        catchError((error) => {
          this.error = error.message;
          this.isLoading = false;
          return of(null);
        })
      )
      .subscribe((data: BookingInfo | null) => {
        if (data) {
          this.bookingInfo = data;
          this.error = null;
        } else {
          this.bookingInfo = null;
        }
        this.isLoading = false;
      });
  }

  handleBookingCancellation(): void {
    if (!this.bookingInfo) return;
    const token = localStorage.getItem('token') || '';
    this.bookingService
      .cancelBooking(this.bookingInfo.id, token)
      .pipe(
        catchError((error) => {
          this.error = error.message;
          return of(null);
        })
      )
      .subscribe((data: any) => {
        this.isDeleted = true;
        this.successMessage = 'Booking has been cancelled successfully!';
        this.bookingInfo = null;
        this.confirmationCodeForm.reset();
        this.error = null;
      });

    setTimeout(() => {
      this.successMessage = '';
      this.isDeleted = false;
    }, 2000);
  }

  formatDate(date: string): string {
    return moment(date).subtract(1, 'month').format('MMM Do, YYYY');
  }
}
