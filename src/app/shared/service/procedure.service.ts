import { Injectable } from '@angular/core';
import { HttpserviceService } from './httpservice.service';
import { Observable } from 'rxjs';
import { BaseResponse } from '../interfaces/response';
import { Procedure } from '../interfaces/procedure';

@Injectable( {
  providedIn: 'root'
} )
export class ProcedureService {

  constructor(
    private http: HttpserviceService
  ) { }


  /**
   * @description Listado de requisitos
   * @returns Listado de requerimientos
   */
  list( page = 1, institution_id = 0 ): Observable<BaseResponse<Procedure[]>> {
    const params = {
      page,
      institution_id,
      'includes[]': [ 'requeriments', 'managerTypes', 'institution', 'compensatories' ]
    }
    return this.http.get( `procedures`, { params } );
  }

  /**
   * @description Crea un nuevo requisito
   * @param data Objeto name 
   * @returns Requisito completo
   */
  store( data: any ): Observable<BaseResponse<Procedure>> {
    return this.http.post( `procedures`, data );
  }

  /**
   * @description Actualiza un requisito
   * @param id Id del requisito que se actualizará
   * @param data Name del requisito
   * @returns Requisito actualizado
   */
  update( id: number, data: any ): Observable<BaseResponse<Procedure>> {
    return this.http.put( `procedures/${id}`, data );
  }

  /**
   * @description Elimina requerimiento
   * @param id Id del requerimiento a eliminar
   * @returns 
   */
  delete( id: number ): Observable<any> {
    return this.http.delete( `procedures/${id}` );
  }

}


