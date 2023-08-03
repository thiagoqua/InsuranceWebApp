import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Observable } from 'rxjs';
import { Admin } from '../models/Admin';
import { environment } from 'src/environments/environment.development';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  private NON_AUTH_NEED_API_URL: string = `${environment.backendURL}/api/auth`;

  constructor(private service: AuthenticationService) {}

  intercept(request: HttpRequest<any>,next: HttpHandler): Observable<HttpEvent<any>> {
    const account: Admin | null = this.service.userLogged;
    const isAuthenticatedUrl: boolean = !request.url.match(this.NON_AUTH_NEED_API_URL);
    if (account != null && isAuthenticatedUrl) {
      request = request.clone({
        setHeaders: { Authorization: `Bearer ${account!.token}` },
      });
    }
    return next.handle(request);
  }
}
