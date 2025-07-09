import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CartService } from '../../services/cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart',
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './cart.html',
  styleUrl: './cart.scss',
})
export class Cart implements OnInit, OnDestroy {
  cartResponse: any;
  private readonly cartService = inject(CartService);
  private subscription: Subscription | undefined;

  ngOnInit() {
    this.subscription = this.cartService.getCart().subscribe((cart: any) => {
      console.log('cart', cart);
      this.cartResponse = cart;
    });
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  trackById(index: number, item: any) {
    return item.id;
  }

  incrementQuantity(item: any) {
    this.cartService
      .updateCartItem(item.id, item.quantity + 1)
      .subscribe((cart: any) => {
        this.cartResponse = cart;
      });
  }

  decrementQuantity(item: any) {
    if (item.quantity > 1) {
      this.cartService
        .updateCartItem(item.id, item.quantity - 1)
        .subscribe((cart: any) => {
          this.cartResponse = cart;
        });
    } else {
      this.removeItem(item);
    }
  }

  removeItem(item: any) {
    this.cartService.removeCartItem(item.id).subscribe((cart: any) => {
      this.cartResponse = cart;
    });
  }
}
