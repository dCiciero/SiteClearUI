import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { from, Observable } from 'rxjs';
import { ConfirmationDialogComponent } from '../components/confirmation-dialog/confirmation-dialog.component';

export interface ConfirmationOptions {
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  confirmButtonType?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';
}

@Injectable({
  providedIn: 'root'
})
export class ConfirmationService {
  constructor(private modalService: NgbModal) {}

  confirm(options: ConfirmationOptions = {}): Observable<boolean> {
    const modalRef = this.modalService.open(ConfirmationDialogComponent, {
      backdrop: 'static',
      keyboard: false
    });

    modalRef.componentInstance.title = options.title || 'Confirm Action';
    modalRef.componentInstance.message = options.message || 'Are you sure you want to perform this action?';
    modalRef.componentInstance.confirmText = options.confirmText || 'Confirm';
    modalRef.componentInstance.cancelText = options.cancelText || 'Cancel';
    modalRef.componentInstance.confirmButtonType = options.confirmButtonType || 'primary';

    return from(modalRef.result.catch(() => false));
  }

}
