import { Injectable } from '@angular/core';
import { ToastaService, ToastOptions } from 'ngx-toasta';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private toastaService: ToastaService) { }

  public showToast(
    msg,
    type: 'success' | 'info' | 'warning' | 'error',
    title = '',
    showClose = true,
    theme: 'default' | 'bootstrap' | 'material' = 'bootstrap',
    timeout = 2000) {

    const toastOptions: ToastOptions = {
      title, msg, showClose, timeout, theme, showDuration: false
    };

    if (type === 'success') {
      this.toastaService.success(toastOptions);
    }

    if (type === 'info') {
      this.toastaService.info(toastOptions);
    }

    if (type === 'warning') {
      this.toastaService.warning(toastOptions);
    }

    if (type === 'error') {
      this.toastaService.error(toastOptions);
    }
  }

  public clearAllToasts() {
    this.toastaService.clearAll();
  }
}
