import {
  HttpErrorResponse,
  HttpInterceptorFn
} from '@angular/common/http';

import { inject, Injector } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {

  const _router = inject(Router);
  const injector = inject(Injector);

  return next(req).pipe(

    catchError((error: HttpErrorResponse) => {

      const toastService = injector.get(ToastrService);

      toastService.error(error.message, 'Error');

      _router.navigate(['/error']);

      console.log("tipo de error: " + error.status);
      console.log("mensaje: " + error.message);

      return throwError(() => error);

    })

  );
};