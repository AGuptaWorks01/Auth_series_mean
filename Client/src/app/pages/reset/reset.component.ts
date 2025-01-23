import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { confirmPasswordValidator } from '../../validators/confirm-password.validator';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-reset',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, FormsModule],
  templateUrl: './reset.component.html',
  styleUrl: './reset.component.scss',
})
export default class ResetComponent implements OnInit {
  resetForm!: FormGroup;
  fb = inject(FormBuilder);
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  authService = inject(AuthService);

  token!: string;

  ngOnInit(): void {
    this.resetForm = this.fb.group(
      {
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
      },
      {
        validator: confirmPasswordValidator('password', 'confirmPassword'),
      }
    );
    this.activatedRoute.params.subscribe((val) => {
      this.token = val['token'];
      // console.log(this.token);
    });
  }

  reset() {
    let resetObj = {
      token: this.token,
      password: this.resetForm.value.password,
    };
    this.authService.ResetPasswordService(resetObj).subscribe({
      next: (res) => {
        alert(res.message);
        this.resetForm.reset();
        this.router.navigateByUrl('login');
      },
      error: (err) => {
        alert(err.message.err);
      },
    });
  }
}
