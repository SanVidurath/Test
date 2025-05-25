import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/AuthService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  username = '';
  password = '';
  error = '';
  success = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(form: any) {
    if (form.invalid) return;
    this.authService.register(this.username, this.password).subscribe({
      next: (res) => {
        this.success = 'Registration successful!Please log in.';
        this.error = '';
        this.router.navigate(['/login']);
      },
      error: () => {
        this.error = 'Registration failed';
        this.success = '';
      },
    });
  }
}
