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
  list(): Observable<BaseResponse<Procedure[]>> {
    return this.http.get( `requeriments` );
  }

  /**
   * @description Crea un nuevo requisito
   * @param data Objeto name 
   * @returns Requisito completo
   */
  store( data: any ): Observable<BaseResponse<Procedure>> {
    return this.http.post( `requeriments`, data );
  }

  /**
   * @description Actualiza un requisito
   * @param id Id del requisito que se actualizará
   * @param data Name del requisito
   * @returns Requisito actualizado
   */
  update( id: number, data: any ): Observable<BaseResponse<Procedure>> {
    return this.http.put( `requeriments/${id}`, data );
  }

  /**
   * @description Elimina requerimiento
   * @param id Id del requerimiento a eliminar
   * @returns 
   */
  delete( id: number ): Observable<any> {
    return this.http.delete( `requeriments/${id}` );
  }

}


