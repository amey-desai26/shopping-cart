import { CommonModule } from '@angular/common';
import {
  Component,
  OnInit,
  OnDestroy,
  inject,
  EventEmitter,
  Output,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { Subscription } from 'rxjs';
import { Product } from './product.model';
import { ProductService } from '../../services/product.service.';
import { CartService } from '../../services/cart.service';
import { TosterService } from '../../services/toster.service';
import { SharedStateService } from '../../services/shared-state.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatGridListModule,
  ],
  templateUrl: './product-list.html',
  styleUrl: './product-list.scss',
})
export class ProductList implements OnInit, OnDestroy, OnChanges {
  public products: Product[] = [];
  private subscriptions: Subscription[] = [];
  private readonly productService = inject(ProductService);
  private readonly cartService = inject(CartService);
  private readonly toasterService = inject(TosterService);
  private readonly state = inject(SharedStateService);
  @Input() searchTerm = '';
  @Input() sortBy = '';
  @Input() sortOrder = '';

  constructor() {
    this.subscriptions = [];
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['searchTerm'] || changes['sortBy'] || changes['sortOrder']) {
      this.fetchProducts();
    }
  }

  private fetchProducts() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
    const sub = this.productService
      .getProducts(this.searchTerm, this.sortBy, this.sortOrder)
      .subscribe((data: Product[]) => {
        this.products = data;
      });
    this.subscriptions.push(sub);
  }

  ngOnInit() {
    this.fetchProducts();
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  public addToCart(product: Product): void {
    const sub = this.cartService
      .addToCart(product)
      .subscribe((cartData: any) => {
        this.toasterService.show(
          `${product.name} has been added to your cart!`
        );
        this.state.setCartCount(cartData.items.length);
      });
    this.subscriptions.push(sub);
  }
}
