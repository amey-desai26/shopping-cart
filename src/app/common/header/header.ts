import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatBadgeModule } from '@angular/material/badge';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Router } from '@angular/router';
import { SharedStateService } from '../../services/shared-state.service';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatBadgeModule,
    FormsModule,
    MatMenuModule,
  ],
  templateUrl: './header.html',
  styleUrls: ['./header.scss'],
})
export class HeaderComponent {
  public searchValue: string = '';
  public cartCount: number = 0;
  private searchSubject = new Subject<string>();
  selectedSortBy: string = '';
  selectedSortOrder: string = '';

  constructor(private router: Router, private state: SharedStateService) {}

  ngOnInit(): void {
    this.state.cartCount$.subscribe((count) => {
      this.cartCount = count;
    });
    this.state.sort$.subscribe((sort) => {
      this.selectedSortBy = sort.sortBy;
      this.selectedSortOrder = sort.sortOrder;
    });
    this.searchSubject.pipe(debounceTime(400)).subscribe((value) => {
      this.state.setSearchTerm(value);
    });
  }

  public onSearchInput(value: string): void {
    this.searchValue = value;
    this.searchSubject.next(value);
  }

  public goToCart(): void {
    this.router.navigate(['/cart']);
  }

  public gotoProductList(): void {
    this.router.navigate(['/']);
    this.state.setSearchTerm(''); // Clear search term when navigating to product list
  }

  public sortBy(sortBy: string, sortOrder: string): void {
    this.state.setSort({ sortBy, sortOrder });
  }
}
