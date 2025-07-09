import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CartService } from '../../services/cart.service';
import { SharedStateService } from '../../services/shared-state.service';
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
  private readonly state = inject(SharedStateService);
  private subscription: Subscription | undefined;

  ngOnInit() {
    this.subscription = this.cartService.getCart().subscribe((cart: any) => {
      this.cartResponse = cart;
      this.state.setCartCount(cart.items?.length || 0);
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
          this.state.setCartCount(cart.items.length);
        });
    } else {
      this.removeItem(item, true);
    }
  }

  removeItem(item: any, updateCount = false) {
    this.cartService.removeCartItem(item.id).subscribe((cart: any) => {
      this.cartResponse = cart;
      if (updateCount) {
        this.state.setCartCount(cart.items.length);
      }
    });
  }
}
