import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import moment from 'moment';
import { AuthService } from '../../services/auth.service';
import { NgFor, NgIf } from '@angular/common';
import { BookingService } from '../../services/booking.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  standalone: true,
  imports: [NgIf, NgFor],
})
export class ProfileComponent implements OnInit {
  user: any = {
    id: '',
    email: '',
    firstName: '',
    lastName: '',
    roles: [{ id: '', name: '' }],
  };
  bookings: any[] = [
    {
      id: '',
      room: { id: '', roomType: '' },
      checkInDate: '',
      checkOutDate: '',
      bookingConfirmationCode: '',
    },
  ];
  message: string = '';
  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private bookingService: BookingService,
    private router: Router
  ) {
    const token = localStorage.getItem('token') || '';
    this.authService.user.subscribe((user) => {
      console.log({ user });

      this.authService.getUser(user?.email || user?.sub, token).subscribe({
        next: (userData) => {
          debugger;
          this.user = userData;
        },
        error: (error) => {
          console.error(error);
        },
      });
      this.bookingService
        .getBookingsByEmail(user?.email || user?.sub, token)
        .subscribe({
          next: (response) => {
            this.bookings = response;
          },
          error: (error) => {
            console.error('Error fetching bookings:', error.message);
            this.errorMessage = error.message;
          },
        });
    });
  }

  ngOnInit(): void {}

  handleDeleteAccount(): void {
    const confirmed = window.confirm(
      'Are you sure you want to delete your account? This action cannot be undone.'
    );
    if (confirmed) {
      const userId = localStorage.getItem('userId') || '';
      this.authService.deleteUser(userId).subscribe({
        next: (response) => {
          this.message = response.message;
          localStorage.removeItem('token');
          localStorage.removeItem('userId');
          localStorage.removeItem('userRole');
          this.router.navigate(['/']);
          window.location.reload();
        },
        error: (error) => {
          this.errorMessage = error.message;
        },
      });
    }
  }

  dateFormatter(value: any) {
    return moment(value).subtract(1, 'month').format('MMM Do, YYYY');
  }
}
