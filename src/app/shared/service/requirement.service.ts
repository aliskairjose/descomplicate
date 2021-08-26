import { Injectable } from '@angular/core';
import { HttpserviceService } from './httpservice.service';
import { Observable } from 'rxjs';
import { BaseResponse, Response } from '../interfaces/response';
import { Requirement } from '../interfaces/requirement';

@Injectable( {
  providedIn: 'root'
} )
export class RequirementService {

  constructor(
    private http: HttpserviceService
  ) { }


  /**
   * @description Listado de requisitos
   * @returns Listado de requerimientos
   */
  list( page = 1 ): Observable<BaseResponse<Requirement[]>> {
    return this.http.get( `requeriments?page=${page}`, );
  }

  /**
   * @description Crea un nuevo requisito
   * @param data Objeto name 
   * @returns Requisito completo
   */
  store( data: any ): Observable<BaseResponse<Requirement>> {
    return this.http.post( `requeriments`, data );
  }

  /**
   * @description Actualiza un requisito
   * @param id Id del requisito que se actualizará
   * @param data Name del requisito
   * @returns Requisito actualizado
   */
  update( id: number, data: any ): Observable<BaseResponse<Requirement>> {
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


