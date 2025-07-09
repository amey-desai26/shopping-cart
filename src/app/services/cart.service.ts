import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private baseUrl = environment.apiUrl + '/api/cart';

  constructor(private api: ApiService) {}

  getCart(): Observable<any> {
    return this.api.get<any>(this.baseUrl);
  }

  addToCart(item: any): Observable<any> {
    return this.api.post<any>(this.baseUrl, item);
  }

  updateCartItem(id: number, quantity: number): Observable<any> {
    return this.api.put<any>(`${this.baseUrl}/${id}`, { quantity });
  }

  removeCartItem(id: number): Observable<any> {
    return this.api.delete<any>(`${this.baseUrl}/${id}`);
  }
}
