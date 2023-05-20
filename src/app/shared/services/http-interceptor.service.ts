import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpEvent,
  HttpHandler,
  HttpRequest,
} from "@angular/common/http";
import { catchError, finalize, Observable, throwError } from "rxjs";
import { SpinnerService } from "./spinner.service";
import { SnackbarService } from "./snackbar.service";

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {
  requestsCounter = 0;
  responsesCounter = 0;

  constructor(
    private spinnerService: SpinnerService,
    private snackbarService: SnackbarService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.requestsCounter++;
    this.spinnerService.showSpinner();
    return next.handle(req).pipe(
      catchError((err) => {
        this.snackbarService.showErrorSnackBar();
        console.log("http error", err);
        return throwError(() => err);
      }),
      finalize(() => {
        this.responsesCounter++;
        if (this.requestsCounter == this.responsesCounter) {
          this.spinnerService.hideSpinner();
          this.requestsCounter = 0;
          this.responsesCounter = 0;
        }
      })
    );
  }
}
