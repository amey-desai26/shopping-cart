import { Injectable, inject } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class TosterService {
  private readonly snackBar = inject(MatSnackBar);

  show(
    message: string,
    action: string = 'OK',
    duration: number = 3000,
    config?: MatSnackBarConfig
  ): void {
    this.snackBar.open(message, action, {
      duration,
      verticalPosition: 'top',
      horizontalPosition: 'center',
      ...config,
    });
  }
}
