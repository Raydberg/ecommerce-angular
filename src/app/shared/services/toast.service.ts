import { Injectable, signal } from '@angular/core';


export type ToastType = 'success' | 'error' | 'info'

interface Toast {
  id: number,
  message: string,
  type: ToastType,
  duration?: number
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  private _toast = signal<Toast[]>([])
  toasts = this._toast.asReadonly()

  show(message: string, type: ToastType = 'info', duration: number = 3000) {
    const id = Date.now()

    this._toast.update(prev => [...prev, { id, message, type }])

    setTimeout(() => {
      this._toast.update(prev => prev.filter(t => t.id !== id))
    }, duration)
  }




}
