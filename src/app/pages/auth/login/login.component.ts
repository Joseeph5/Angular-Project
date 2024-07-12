import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule, RouterLink],
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  handleInputChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.loginForm.patchValue({ [input.name]: input.value });
  }

  handleSubmit() {
    if (this.loginForm.valid) {
      this.authService.loginUser(this.loginForm.value).subscribe({
        next: (success: any) => {
          if (success) {
            const token = success.token;
            this.authService.handleLogin(token);
            const redirectUrl =
              this.route.snapshot.queryParams['redirectUrl'] || '/';
            this.router.navigate([redirectUrl], { replaceUrl: true });
          } else {
            this.errorMessage =
              'Invalid username or password. Please try again.';
            setTimeout(() => {
              this.errorMessage = '';
            }, 4000);
          }
        },
        error: (error: any) => {
          this.errorMessage = error.message;
        },
      });
    }
  }
}
