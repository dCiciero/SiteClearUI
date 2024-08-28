import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  toastSubject: Subject<any> = new Subject<any>();

  constructor() { }

  showSuccess(message: string) {
    this.show(message, 'success');
  }

  showError(message: string) {
    this.show(message, 'danger');
  }

  showInfo(message: string) {
    this.show(message, 'info');
  }

  private show(message: string, type: string) {
    this.toastSubject.next({ message, type });
  }
}
