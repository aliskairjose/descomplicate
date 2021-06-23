import { Injectable } from '@angular/core';
import { HttpserviceService } from './httpservice.service';
import { Observable, Subject } from 'rxjs';
import { LoginResponse } from '../interfaces/login-response';
import { StorageService } from './storage.service';
import { TOKEN } from '../constants/global-constans';
import { Router } from '@angular/router';
import { User } from '../interfaces/user';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private isAuth$: Subject<boolean> = new Subject<boolean>();
	private user$: Subject<User> = new Subject<User>();

  constructor(
		private router: Router,
		private http: HttpserviceService,
		private storage: StorageService,
	) { }


          /**
             * 
             * @param type Tipo de usuario ADMIN |STUDENT | ORGANIZATION | UNIVERSITY
             * @param data Email y password
             * @returns Data tipo LoginResponse
             */
          login( type: string, data: any ): Observable<LoginResponse> {
            return this.http.post( `auth/login/${type}`, data );
          }

          /**
           * @description Cierre de sesion del usuario
           */
          logout(): void {
            this.storage.clearAll();
            this.isAuthSubject( false );
            this.router.navigateByUrl( '' );
          }


          recoveryPassword( email: string ): Observable<any> {
            return this.http.post( 'recovery-password', { email } );
          }

          newPassword( data: any ): Observable<any> {
            return this.http.post( 'new-password', data );
          }

          /**
           * @description Verifica si el usuario esta logueado
           * @returns boolean
           */
          isAuthenticated(): boolean {
            const isAuthenticated = this.storage.getItem( TOKEN );
            return isAuthenticated ? true : false;
          }

          /**
           * @description Genera el stream de eventos usando next() para crear el evento
           */
          isAuthSubject( isAuth: boolean ): void {
            this.isAuth$.next( isAuth );
            this.isAuth$.complete();
          }

          /**
           * @description Creación del observer mediante el método asObserver(), el cual sera consumido por el componente
           * @returns Observable boleano
           */
          isAuthObserver(): Observable<boolean> {
            return this.isAuth$.asObservable();
          }

          userSubject( user: User ): void {
            this.user$.next( user );
            this.user$.complete();
          }

          userObserver(): Observable<User> {
            return this.user$.asObservable();
          }

}
