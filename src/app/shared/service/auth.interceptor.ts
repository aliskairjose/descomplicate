
import { Injectable } from '@angular/core';
import {
  HttpRequest,
	HttpHandler,
	HttpEvent,
	HttpInterceptor,
	HttpErrorResponse,
	HttpResponse
} from '@angular/common/http';
import { Observable,throwError } from 'rxjs';
import { TOKEN } from '../constants/global-constans';
import { catchError, map } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';
import { StorageService } from './storage.service';
import Swal from 'sweetalert2';
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

	constructor(
		private storage: StorageService,
		private spinner: NgxSpinnerService,

	) { }

	intercept( request: HttpRequest<unknown>, next: HttpHandler ): Observable<HttpEvent<unknown>> {
		this.spinner.show();

		const token = this.storage.getItem( TOKEN );
		if ( token ) {
			request = request.clone( { headers: request.headers.set( 'Authorization', `Bearer ${token}` ) } );
		}

		if ( !request.headers.has( 'Content-Type' ) ) {
			request = request.clone( { headers: request.headers.set( 'Content-Type', 'application/json' ) } );
		}

		request = request.clone( { headers: request.headers.set( 'Accept', 'application/json' ) } );

		return next.handle( request ).pipe( map( ( event: HttpEvent<any> ) => {
			if ( event instanceof HttpResponse ) {
				this.spinner.hide();
			}
			return event;
		} ),
			catchError( ( response: HttpErrorResponse ) => {
				this.spinner.hide();
			
				// const errors = response.error.errors;
				// let mensaje = "";

				// if(Object.entries(errors).length){
				// 	for (const key in errors) {
				// 		if (Object.prototype.hasOwnProperty.call(errors, key)) {
				// 			const element = errors[key];
				// 			mensaje += `${element} <br>`;
				// 		}
				// 	}
				// 	Swal.fire( '', mensaje, 'error' );
				// }else{
						

				// }

				const message = response.error.message;
				Swal.fire( '', message, 'error' );

				return throwError( response );
			} )
		);
	}
}
