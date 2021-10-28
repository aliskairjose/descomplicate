import { Injectable } from '@angular/core';
import { HttpserviceService } from './httpservice.service';
import { Observable, Subject } from 'rxjs';
import { BaseResponse } from '../interfaces/response';

@Injectable( {
  providedIn: 'root'
} )
export class GetdataService {

  constructor(
    private httpService: HttpserviceService,
  ) { }

  roles(): Observable<any> {
    return this.httpService.get( 'roles?admin=true' );
  }

  users( page = 1 ): Observable<any> {
    const params = {
      page,
      'roles[]': [ 'admin', 'finance', 'office', 'approves' ],
    }
    return this.httpService.get( `users-crud`, { params } );
  }

  getManagerTypes(): Observable<BaseResponse<any[]>> {
    return this.httpService.get( 'manager-types' );
  }
}
