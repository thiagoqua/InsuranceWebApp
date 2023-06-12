import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

export const authGuard:CanActivateFn = (route, state) => {
  const router:Router = inject(Router);
  const service:AuthenticationService = inject(AuthenticationService);

  if(service.userLogged != null)
    return true;
  
  return router.navigate(['/login']);
};
