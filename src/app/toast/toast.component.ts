import { Component, OnInit } from '@angular/core';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss'
})
export class ToastComponent implements OnInit {
  toasts: any[] = [];
  
  constructor(private toastService: ToastService) {}

  ngOnInit(): void {
    this.toastService.toastSubject.subscribe((toast) => {
      this.toasts.push(toast);
      setTimeout(() => {
        this.toasts.shift()
      }, 5000);
    })
  }

  removeToast(index: number) {
    this.toasts.splice(index, 1);
  }

}
