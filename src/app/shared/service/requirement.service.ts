import { Injectable } from '@angular/core';
import { HttpserviceService } from './httpservice.service';
import { Observable } from 'rxjs';
import { BaseResponse, Response } from '../interfaces/response';

@Injectable( {
  providedIn: 'root'
} )
export class RequirementService {

  constructor(
    private http: HttpserviceService
  ) { }


  /**
   * 
   * @returns Listado de requerimientos
   */
  list(): Observable<BaseResponse<any[]>> {
    return this.http.get( `requeriments` );
  }

  /**
   * 
   * @param data Objeto name 
   * @returns Requisito completo
   */
  store( data: any ): Observable<BaseResponse<any>> {
    return this.http.post( `requeriments`, data );
  }

}


