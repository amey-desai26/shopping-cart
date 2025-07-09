import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApiService {
  constructor(private http: HttpClient) {}

  get<T>(url: string, options?: any): Observable<T> {
    return this.http.get<T>(url, options) as Observable<T>;
  }

  post<T>(url: string, body: any, options?: any): Observable<T> {
    return this.http.post<T>(url, body, options) as Observable<T>;
  }

  put<T>(url: string, body: any, options?: any): Observable<T> {
    return this.http.put<T>(url, body, options) as Observable<T>;
  }

  delete<T>(url: string, options?: any): Observable<T> {
    return this.http.delete<T>(url, options) as Observable<T>;
  }
}
