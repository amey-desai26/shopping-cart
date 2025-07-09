import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SharedStateService {
  private cartCountSubject = new BehaviorSubject<number>(0);
  private searchTermSubject = new BehaviorSubject<string>('');
  private sortSubject = new BehaviorSubject<{
    sortBy: string;
    sortOrder: string;
  }>({
    sortBy: '',
    sortOrder: '',
  });

  cartCount$ = this.cartCountSubject.asObservable();
  searchTerm$ = this.searchTermSubject.asObservable();
  sort$ = this.sortSubject.asObservable();

  setCartCount(count: number) {
    this.cartCountSubject.next(count);
  }

  setSearchTerm(term: string) {
    this.searchTermSubject.next(term);
  }

  setSort(sort: { sortBy: string; sortOrder: string }) {
    this.sortSubject.next(sort);
  }

  getCartCount() {
    return this.cartCountSubject.value;
  }

  getSearchTerm() {
    return this.searchTermSubject.value;
  }

  getSort() {
    return this.sortSubject.value;
  }
}
