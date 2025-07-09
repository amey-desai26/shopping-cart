import { Routes } from '@angular/router';
import { Homepage } from './components/homepage/homepage';
import { Cart } from './components/cart/cart';

export const routes: Routes = [
  { path: '', component: Homepage },
  { path: 'cart', component: Cart },
];
