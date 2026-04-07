import { Component, inject } from '@angular/core';
import { ToastService } from '@shared/services/toast.service';

@Component({
  selector: 'toast',
  imports: [],
  template: `
  <div class="toast toast-top toast-end z-50">

    @for (toast of toastService.toasts(); track toast.id) {
      <div class="alert"
           [class.alert-info]="toast.type === 'info'"
           [class.alert-success]="toast.type === 'success'"
            [class.alert-error]="toast.type === 'error'">
         <span>{{ toast.message }}</span>
       </div>
     }
  
   </div>
  `
})
export class Toast {
  toastService = inject(ToastService)
}
