import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit, OnDestroy {
  isLoggedIn: boolean = false;
  private subscription: Subscription | undefined;

  authService = inject(AuthService);
  router = inject(Router);

  ngOnInit(): void {
    this.subscription = this.authService.isLoggedIn$.subscribe((status) => {
      this.isLoggedIn = status;
    });
  }
  ngOnDestroy(): void {
     if (this.subscription) {
       this.subscription.unsubscribe();
     }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
