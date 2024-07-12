import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import moment from 'moment';
import { CommonModule } from '@angular/common';
// import { BookingSummaryComponent } from './booking-summary/booking-summary.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BookingService } from '../../services/booking.service';
import { RoomService } from '../../services/room.service';
import { BookingSummaryComponent } from '../booking-summary/booking-summary.component';

@Component({
  selector: 'app-booking-form',
  templateUrl: './booking-form.component.html',
  styleUrls: ['./booking-form.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BookingSummaryComponent,
  ],
})
export class BookingFormComponent implements OnInit {
  bookingForm: FormGroup;
  validated = false;
  isSubmitted = false;
  errorMessage = '';
  roomPrice = 0;
  currentUser = localStorage.getItem('userId');
  roomId: string;
  minDate: Date = new Date();

  constructor(
    private fb: FormBuilder,
    private bookingService: BookingService,
    private roomService: RoomService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.roomId = this.route.snapshot.paramMap.get('roomId') || '';
    this.bookingForm = this.fb.group({
      guestFullName: ['', Validators.required],
      guestEmail: ['', Validators.required, Validators.email],
      checkInDate: ['', Validators.required],
      checkOutDate: ['', Validators.required],
      numOfAdults: ['', [Validators.required, Validators.min(1)]],
      numOfChildren: ['', [Validators.required, Validators.min(0)]],
    });
  }

  ngOnInit(): void {
    this.getRoomPriceById(this.roomId);
  }

  getRoomPriceById(roomId: string): void {
    this.roomService.getRoomById(roomId).subscribe({
      next: (response: any) => {
        this.roomPrice = response.roomPrice;
      },
      error: (error: any) => {
        this.errorMessage = error.message;
      },
    });
  }

  calculatePayment(): number {
    const checkInDate = moment(this.bookingForm.get('checkInDate')?.value);
    const checkOutDate = moment(this.bookingForm.get('checkOutDate')?.value);
    const diffInDays = checkOutDate.diff(checkInDate, 'days');
    const paymentPerDay = this.roomPrice ? this.roomPrice : 0;
    return diffInDays * paymentPerDay;
  }

  isGuestCountValid(): boolean {
    const adultCount = parseInt(this.bookingForm.get('numOfAdults')?.value, 10);
    const childrenCount = parseInt(
      this.bookingForm.get('numOfChildren')?.value,
      10
    );
    const totalCount = adultCount + childrenCount;
    return totalCount >= 1 && adultCount >= 1;
  }

  isCheckOutDateValid(): boolean {
    const checkInDate = moment(this.bookingForm.get('checkInDate')?.value);
    const checkOutDate = moment(this.bookingForm.get('checkOutDate')?.value);
    if (!checkOutDate.isSameOrAfter(checkInDate)) {
      this.errorMessage = 'Check-out date must be after check-in date';
      return false;
    } else {
      this.errorMessage = '';
      return true;
    }
  }

  handleSubmit(): void {
    console.log('submit');

    this.validated = true;
    if (
      this.bookingForm.invalid ||
      !this.isGuestCountValid() ||
      !this.isCheckOutDateValid()
    ) {
      return;
    }
    this.isSubmitted = true;
  }

  handleFormSubmit(): void {
    this.bookingService
      .bookRoom(this.roomId, this.bookingForm.value)
      .subscribe({
        next: (confirmationCode: any) => {
          this.isSubmitted = true;
          this.router.navigate(['/booking-success'], {
            state: { message: confirmationCode },
          });
        },
        error: (error: any) => {
          console.log({ error });

          this.errorMessage = error.message;
          this.router.navigate(['/booking-success'], {
            state: { message: this.errorMessage },
          });
        },
      });
  }
}
