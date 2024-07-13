import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule, RouterLink],
})
export class RegistrationComponent {
  registrationForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registrationForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  handleInputChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.registrationForm.patchValue({ [input.name]: input.value });
  }

  handleRegistration() {
    if (this.registrationForm.valid) {
      this.authService.registerUser(this.registrationForm.value).subscribe({
        next: (result: any) => {
          if (result) {
            this.successMessage = 'Registration successful!';
            this.errorMessage = '';
            this.registrationForm.reset();
          } else {
            this.successMessage = '';
            this.errorMessage = 'Registration error. Please try again.';
          }

          setTimeout(() => {
            this.errorMessage = '';
            this.successMessage = '';
          }, 5000);
        },
        error: (error: any) => {
          this.successMessage = '';
          this.errorMessage = `Registration error: ${error.message}`;
        },
      });
    }
  }
}
