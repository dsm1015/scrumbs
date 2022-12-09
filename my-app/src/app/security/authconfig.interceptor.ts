import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';
import { AuthenticationService } from "./authentication.service"

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private authService: AuthenticationService){
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const { url, method, headers, body } = request;
        const idToken = this.authService.getToken();

        // wrap in delayed observable to simulate server api call
        return of(null)
            .pipe(mergeMap(handleRoute))
            .pipe(materialize()) // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
            .pipe(delay(500))
            .pipe(dematerialize());

        function handleRoute() {
           return authenticate();
        }

        // add tokens to APIs for authentication on server side
        function authenticate() {
            if (idToken) {
                const cloned = request.clone({headers: request.headers.set("Authorization", "Bearer " + idToken)});
                console.log("CLONE:", cloned);
                return next.handle(cloned);
            }
            else {
                console.log("REQ:",request);
                return next.handle(request);
            }
        }
    }
}
