import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private _snackBar: MatSnackBar) { }

  message(message: string, type) {
    let panelClass = type === "success" ? 'green-snackbar' : 'red-snackbar'
    this._snackBar.open(message, '', {
      duration: 2000,
      panelClass: [panelClass]
    });
  }
}
