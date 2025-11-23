import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, from } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private auth: AuthService, private toastr: ToastrService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.auth.getAccessToken();
        let authReq = req;

        if (token) {
            authReq = req.clone({
                headers: req.headers.set('Authorization', `Bearer ${token}`)
            });
        }

        return next.handle(authReq).pipe(
            catchError((err: HttpErrorResponse) => {
                if (err.status === 401 && err.error?.code === 'ACCESSS_TOKEN_INVALID') {
                    // Refresh token và retry request
                    return this.auth.refreshAccessToken().pipe(
                        switchMap(newToken => {
                            const newReq = req.clone({
                                headers: req.headers.set('Authorization', `Bearer ${newToken}`)
                            });
                            return next.handle(newReq);
                        }),
                        catchError(refreshErr => {
                            this.toastr.error('Session expired. Please login again');
                            // logout hoặc redirect
                            return throwError(() => refreshErr);
                        })
                    );
                }
                return throwError(() => err);
            })
        );
    }
}
