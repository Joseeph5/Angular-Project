import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RoomService } from '../../../services/room.service';

@Component({
  selector: 'app-edit-room',
  standalone: true,
  templateUrl: './edit-room.component.html',
  styleUrls: ['./edit-room.component.css'],
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
})
export class EditRoomComponent implements OnInit {
  roomForm: FormGroup;
  roomId: string = '';
  imagePreview: string = '';
  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private roomService: RoomService
  ) {
    this.roomForm = this.fb.group({
      photo: ['', Validators.required],
      roomType: ['', Validators.required],
      roomPrice: ['', [Validators.required, Validators.min(0)]],
    });
  }

  ngOnInit(): void {
    this.roomId = this.route.snapshot.paramMap.get('roomId')!;
    this.fetchRoom();
  }

  fetchRoom(): void {
    this.roomService.getRoomById(this.roomId).subscribe({
      next: (roomData: any) => {
        this.roomForm.patchValue(roomData);
        this.imagePreview = roomData.photo;
      },
      error: (err: any) => console.error(err),
    });
  }

  handleImageChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const selectedImage = input.value;
    this.roomForm.patchValue({ photo: selectedImage });
    this.imagePreview = selectedImage;
  }

  handleSubmit(): void {
    if (this.roomForm.invalid) return;
    const token = localStorage.getItem('token') || '';
    this.roomService
      .updateRoom(this.roomId, this.roomForm.value, token)
      .subscribe({
        next: (response: any) => {
          if (response.status === 200) {
            this.successMessage = 'Room updated successfully!';
            this.fetchRoom();
            this.errorMessage = '';
          } else {
            this.errorMessage = 'Error updating room';
          }
        },
        error: (err: any) => {
          console.error(err);
          this.errorMessage = err.message;
        },
      });
  }

  goBack(): void {
    this.router.navigate(['/existing-rooms']);
  }
}
