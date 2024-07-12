import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-booking-success',
  templateUrl: './booking-success.component.html',
  styleUrls: ['./booking-success.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class BookingSuccessComponent implements OnInit {
  message?: string;
  error?: string;

  constructor(private route: ActivatedRoute, private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as {
      message: string;
      error: string;
    };
    this.message = state?.['message'];
    this.error = state?.['error'];
  }

  ngOnInit(): void {}
}
