import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpserviceService } from './httpservice.service';
import { Observable } from 'rxjs';
import { BaseResponse } from '../interfaces/response';
import { CompensatoryExpenseType } from '../interfaces/compenatory-expense-type';

@Injectable( {
  providedIn: 'root'
} )
export class CompensatoryExpenseTypeService {

  constructor(
    private http: HttpserviceService
  ) { }

  /**
   * @description Lista los gastos compensatorios
   * @returns 
   */
  list( page = 1 ): Observable<BaseResponse<CompensatoryExpenseType[]>> {
    const params = {
      page
    };
    return this.http.get( `compensatory-expense-types`, { params } );
  }

  /**
   * @description Crea un nuevo recurso
   * @param data 
   * @returns 
   */
  store( data: any ): Observable<any> {
    return this.http.post( `compensatory-expense-types`, data );
  }

  /**
   * @description Actualiza la data del recurso
   * @param id Id del recurso a actualizar
   * @param data Datos del recurso a actualizar
   * @returns 
   */
  update( id: number, data: any ): Observable<BaseResponse<CompensatoryExpenseType>> {
    return this.http.put( `compensatory-expense-types/${id}`, data );
  }

  /**
   * @description Busca un recurso por el id
   * @param id Id del recurso
   * @returns 
   */
  show( id: number ): Observable<Observable<BaseResponse<CompensatoryExpenseType>>> {
    return this.http.get( `compensatory-expense-types/${id}` );
  }

  /**
   * @description Eliima un recurso por el id suministrado
   * @param id Id del recurso
   * @returns 
   */
  delete( id: number ): Observable<BaseResponse<CompensatoryExpenseType>> {
    return this.http.delete( `compensatory-expense-types/${id}` );
  }



}
