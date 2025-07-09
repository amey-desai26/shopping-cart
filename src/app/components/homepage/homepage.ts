import { Component, OnDestroy } from '@angular/core';
import { ProductList } from '../product-list/product-list';
import { SharedStateService } from '../../services/shared-state.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [ProductList],
  templateUrl: './homepage.html',
  styleUrl: './homepage.scss',
})
export class Homepage implements OnDestroy {
  public searchTerm: string = '';
  public sortBy: string = '';
  public sortOrder: string = '';
  private searchSub: Subscription;
  private sortSub: Subscription;

  constructor(private state: SharedStateService) {
    this.searchSub = this.state.searchTerm$.subscribe((term) => {
      this.searchTerm = term;
    });
    this.sortSub = this.state.sort$.subscribe((sort) => {
      this.sortBy = sort.sortBy;
      this.sortOrder = sort.sortOrder;
    });
  }

  ngOnDestroy() {
    this.searchSub.unsubscribe();
    this.sortSub.unsubscribe();
  }
}
