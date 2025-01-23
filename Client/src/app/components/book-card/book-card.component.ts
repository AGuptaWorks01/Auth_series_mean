import { Component, Input } from '@angular/core';
import { Book, BookService } from '../../services/book.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-book-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './book-card.component.html',
  styleUrl: './book-card.component.scss',
})
export class BookCardComponent {
  @Input({ required: true }) book!: Book;
  errorMessage: string | null = null; // Error message to display for rate limit
  successMessage: string | null = null; // Success message when added to cart

  constructor(private bookService: BookService) { }

  ngOnInit() {
    // Any initialization logic
  }

  // Action to add the book to the cart
  addToCart() {
    // Call bookService to simulate the add-to-cart operation
    this.bookService.getBooks().subscribe(
      (response) => {
        // Successful addition logic
        this.successMessage = 'Book added to cart successfully!';
        this.errorMessage = null; // Clear any previous error messages
      },
      (error) => {
        // In case of error, especially rate limit error
        this.successMessage = null; // Clear success message
        this.errorMessage = error.message; // Capture and show the error message
      }
    );
  }
}
