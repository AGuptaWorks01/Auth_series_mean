import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Book, BookService } from '../../services/book.service';
import { BookCardComponent } from '../../components/book-card/book-card.component';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, BookCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export default class HomeComponent implements OnInit {
  private bookService = inject(BookService);
  books: Book[] = [];
  
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.getBooks();
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
    }
  }

  getBooks() {
    this.bookService.getBooks().subscribe({
      next: (res) => {
        this.books = res.data;
      },
    });
  }
}
