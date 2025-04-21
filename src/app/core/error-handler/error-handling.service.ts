// error-handler.service.ts

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ErrorMessage } from './errorMessage';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlingService {
  private errorMessageSubject = new BehaviorSubject<ErrorMessage | undefined>(undefined);

  get errorMessage$(): Observable<ErrorMessage | undefined> {
    return this.errorMessageSubject.asObservable();
  }

  setError(message: ErrorMessage): void {
    this.errorMessageSubject.next(message);
  }
}
