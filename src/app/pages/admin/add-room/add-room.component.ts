import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RoomService } from '../../../services/room.service';

@Component({
  selector: 'app-add-room',
  standalone: true,
  templateUrl: './add-room.component.html',
  styleUrls: ['./add-room.component.css'],
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
})
export class AddRoomComponent implements OnInit {
  roomForm: FormGroup;
  imagePreview: string = '';
  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private roomService: RoomService,
    public router: Router
  ) {
    this.roomForm = this.fb.group({
      photo: ['', Validators.required],
      roomType: ['', Validators.required],
      roomPrice: [0, [Validators.required, Validators.min(0)]],
    });
  }

  ngOnInit(): void {}

  handleImageChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const selectedImage = input.value;
    this.roomForm.patchValue({ photo: selectedImage });
    this.imagePreview = selectedImage;
  }

  handleRoomInputChange(): void {
    // Logic handled by Angular Reactive Forms
  }

  handleSubmit(): void {
    if (this.roomForm.invalid) return;
    const token = localStorage.getItem('token') || '';
    this.roomService.addRoom(this.roomForm.value, token).subscribe({
      next: () => {
        this.successMessage = 'A new room was added successfully!';
        this.roomForm.reset();
        this.imagePreview = '';
        this.errorMessage = '';
        setTimeout(() => {
          this.successMessage = '';
          this.router.navigate(['/existing-rooms']);
        }, 3000);
      },
      error: (err) => {
        this.errorMessage = err.message;
        setTimeout(() => {
          this.errorMessage = '';
        }, 3000);
      },
    });
  }
}
