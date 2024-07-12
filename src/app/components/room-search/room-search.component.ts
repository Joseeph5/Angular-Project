import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { CommonModule } from '@angular/common';
import moment from 'moment';
import { RoomService } from '../../services/room.service';

@Component({
  selector: 'app-room-search',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, BsDatepickerModule],
  templateUrl: './room-search.component.html',
  styleUrl: './room-search.component.css',
})
export class RoomSearchComponent {
  searchForm: FormGroup = new FormGroup({});
  errorMessage = '';
  availableRooms: any[] = [];
  isLoading = false;

  constructor(private fb: FormBuilder, private roomService: RoomService) {
    this.searchForm = this.fb.group({
      checkInDate: ['', Validators.required],
      checkOutDate: ['', Validators.required],
      roomType: [''],
    });
  }

  ngOnInit(): void {}

  handleSearch(): void {
    if (this.searchForm.invalid) {
      this.errorMessage = 'Please enter valid dates';
      return;
    }

    const { checkInDate, checkOutDate, roomType } = this.searchForm.value;
    const checkInMoment = moment(checkInDate);
    const checkOutMoment = moment(checkOutDate);

    if (!checkInMoment.isValid() || !checkOutMoment.isValid()) {
      this.errorMessage = 'Please enter valid dates';
      return;
    }

    if (!checkOutMoment.isSameOrAfter(checkInMoment)) {
      this.errorMessage = 'Check-out date must be after check-in date';
      return;
    }

    this.isLoading = true;
    this.roomService
      .getAvailableRooms(checkInDate, checkOutDate, roomType)
      .subscribe({
        next: (response: any) => {
          this.availableRooms = response.data;
          this.isLoading = false;
        },
        error: (error: any) => {
          console.error(error);
          this.isLoading = false;
        },
      });
  }

  handleClearSearch(): void {
    this.searchForm.reset();
    this.availableRooms = [];
  }
}
