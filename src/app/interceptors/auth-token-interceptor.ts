import { HttpInterceptorFn } from '@angular/common/http';

export const authTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const token= sessionStorage.getItem("TOKEN");

  if(token){
    //Clonamos la peticion
    let peticion = req.clone({
      setHeaders : {Authorization: "bearer " + token}
    })
    return next(peticion)
  }
  return next(req);
};
