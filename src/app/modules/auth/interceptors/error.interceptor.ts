import type { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { ToastService } from '@shared/services/toast.service';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { ErrorResponse } from '@core/interfaces/http-error.interface';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {

  const toastService = inject(ToastService)

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      // console.log("Interceptor", { error })
      if (error.status !== 401) {
        let message = 'Ocurrio un error inesperado'
        if (error.error && error.error.message) {
          const backendMessage = error.error.message;
          message = Array.isArray(backendMessage) ? backendMessage.join(", ") : backendMessage
        } else if (error.status === 0) {
          message = "No hay conexion con el servidor"
        }
        toastService.show(message, 'error')
      }
      return throwError(() => error)
    })
  );
};
// {
//     "error": {
//         "headers": {
//             "headers": {},
//             "normalizedNames": {},
//             "lazyUpdate": null
//         },
//         "status": 409,
//         "statusText": "Conflict",
//         "url": "http://localhost:3000/api/categories",
//         "ok": false,
//         "redirected": false,
//         "responseType": "cors",
//         "name": "HttpErrorResponse",
//         "message": "Http failure response for http://localhost:3000/api/categories: 409 Conflict",
//         "error": {
//             "message": [
//                 "El valor del campo [name] ya existe. Por favor usa otro"
//             ],
//             "error": "Conflic",
//             "statusCode": 409
//         }
//     }
// }