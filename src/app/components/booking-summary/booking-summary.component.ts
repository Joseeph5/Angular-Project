import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import moment from 'moment';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-booking-summary',
  templateUrl: './booking-summary.component.html',
  styleUrls: ['./booking-summary.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class BookingSummaryComponent implements OnInit {
  @Input() booking: any;
  @Input() payment: number = 0;
  @Input() isFormValid: boolean = false;
  @Output() onConfirm = new EventEmitter<void>();

  isBookingConfirmed = false;
  isProcessingPayment = false;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  get numberOfDays(): number {
    const checkInDate = moment(this.booking.checkInDate);
    const checkOutDate = moment(this.booking.checkOutDate);
    return checkOutDate.diff(checkInDate, 'days');
  }

  handleConfirmBooking(): void {
    this.isProcessingPayment = true;
    setTimeout(() => {
      this.isProcessingPayment = false;
      this.isBookingConfirmed = true;
      this.onConfirm.emit();
    }, 3000);
  }
}
