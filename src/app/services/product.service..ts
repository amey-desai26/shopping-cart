import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseUrl = environment.apiUrl + '/api/products';

  constructor(private api: ApiService) {}

  getProducts(
    searchTerm?: string,
    sortBy?: string,
    sortOrder?: string
  ): Observable<any> {
    let url = this.baseUrl;
    const params: string[] = [];
    if (searchTerm && searchTerm.trim()) {
      params.push(`search=${encodeURIComponent(searchTerm.trim())}`);
    }
    if (sortBy) {
      params.push(`sortBy=${encodeURIComponent(sortBy)}`);
    }
    if (sortOrder) {
      params.push(`sortOrder=${encodeURIComponent(sortOrder)}`);
    }
    if (params.length) {
      url += '?' + params.join('&');
    }
    return this.api.get<any>(url);
  }

  getProductById(id: number): Observable<any> {
    return this.api.get<any>(`${this.baseUrl}/${id}`);
  }
}
