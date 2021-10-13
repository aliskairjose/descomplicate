import { Injectable } from '@angular/core';
import { HttpserviceService } from './httpservice.service';
import { BaseResponse } from '../interfaces/response';
import { Observable } from 'rxjs';
import { Institution } from '../interfaces/institution';

@Injectable( {
  providedIn: 'root'
} )
export class InstitutionService {

  constructor(
    private http: HttpserviceService
  ) { }

  /**
 * @description Listado de requisitos
 * @returns Listado de requerimientos
 */
  list( params = {} ): Observable<BaseResponse<Institution[]>> {
    return this.http.get( `institutions`, { params } );
  }

  /**
   * @description Crea un nuevo requisito
   * @param data Objeto name 
   * @returns Requisito completo
   */
  store( data: any ): Observable<BaseResponse<Institution>> {
    return this.http.post( `institutions`, data );
  }

  /**
   * @description Actualiza un requisito
   * @param id Id del requisito que se actualizará
   * @param data Name del requisito
   * @returns Requisito actualizado
   */
  update( id: number, data: any ): Observable<BaseResponse<Institution>> {
    return this.http.put( `institutions/${id}`, data );
  }

  /**
   * @description Elimina requerimiento
   * @param id Id del requerimiento a eliminar
   * @returns 
   */
  delete( id: number ): Observable<any> {
    return this.http.delete( `institutions/${id}` );
  }
}
