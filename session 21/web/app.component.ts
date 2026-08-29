import { Component, signal, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Product {
  id: number;
  name: string;
  price: number;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // Available products
  products: Product[] = [
    { id: 1, name: 'Laptop', price: 999.99 },
    { id: 2, name: 'Headphones', price: 49.99 },
    { id: 3, name: 'Mouse', price: 19.99 },
    { id: 4, name: 'Keyboard', price: 89.99 },
  ];

  // Cart signal
  cart = signal<Product[]>([]);

  // Computed total
  total = computed(() => this.cart().reduce((sum, p) => sum + p.price, 0));

  // Effect to log item count
  private logEffect = effect(() => {
    console.log(`Cart contains ${this.cart().length} item(s).`);
  });

  // Add product to cart
  addToCart(product: Product) {
    this.cart.update(items => [...items, product]);
  }

  // Remove product from cart
  removeFromCart(productId: number) {
    this.cart.update(items => items.filter(p => p.id !== productId));
  }

  // Clear cart
  clearCart() {
    this.cart.set([]);
  }
}