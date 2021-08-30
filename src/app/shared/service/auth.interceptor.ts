
import { Injectable } from '@angular/core';
import {
	HttpRequest,
	HttpHandler,
	HttpEvent,
	HttpInterceptor,
	HttpErrorResponse,
	HttpResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { TOKEN } from '../constants/global-constans';
import { catchError, map } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';
import { StorageService } from './storage.service';
import Swal, { SweetAlertIcon } from 'sweetalert2';
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

				// const message = response.error.message;
				// Swal.fire( '', message, 'error' );
				this.swalAlert( 'error', response.error.message, response.error.errors, this.errorsToHtmlList );

				return throwError( response );
			} )
		);
	}

	private swalAlert(
		icon: SweetAlertIcon,
		title = 'Error',
		errors: string[],
		callBack: { ( errors: string[] ): string; ( arg0: string[] ): any; }
	): void {

		const html = callBack( errors );
		Swal.fire( { title, html, icon } );
	}

	private errorsToHtmlList( errors: any ): string {
		const isObject = errors instanceof Object && !Array.isArray( errors );
		if ( errors == null || !isObject ) { return ''; }

		const ul = document.createElement( 'ul' );

		// tslint:disable-next-line: forin
		for ( const key in errors ) {
			const li = document.createElement( 'li' );
			li.innerText = `${errors[ key ][ 0 ]}`;
			ul.appendChild( li );
		}

		return ul.outerHTML;
	}
}
