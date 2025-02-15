import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  fb = inject(FormBuilder);
  authService = inject(AuthService);
  router = inject(Router);

  loginForm!: FormGroup;

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required],
    });
  }

  login() {
    this.authService.loginService(this.loginForm.value).subscribe({
      next: (res) => {
        localStorage.setItem('user_id', res.data._id);
        this.authService.isLoggedIn$.next(true);
        this.router.navigate(['/home']);
        this.loginForm.reset();
      },
      error: (err) => {
        alert('Error email or password');
      },
    });
  }
}
