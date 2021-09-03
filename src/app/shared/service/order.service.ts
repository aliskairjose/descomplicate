import { Injectable } from '@angular/core';
import { HttpserviceService } from 'src/app/shared/service/httpservice.service';
import { Observable } from 'rxjs';
import { BaseResponse } from '../interfaces/response';
import { Order } from '../interfaces/order';

export enum OrderStatus {
  Approve = 1,
  Decline = 2
}
@Injectable( {
  providedIn: 'root'
} )
export class OrderService {

  constructor(
    private http: HttpserviceService
  ) { }

  /**
   * @description Lista los pagos por verificar
   * @returns 
   */
  paymentVerificationList( page = 1 ): Observable<BaseResponse<Order[]>> {
    return this.http.get( `orders?page=${page}&approved_payment=0&with[]=procedure` );
  }

  /**
   * @description Listado de tramites
   * @returns 
   */
  procedureList( page = 1, params: any, mensajeroID: number, tramitadorID: number ): Observable<BaseResponse<Order[]>> {
    let url = `orders?page=${page}&with[]=status&with[]=managers&with[]=procedure.institution`;
    if ( mensajeroID > 0 ) {
      url = `${url}&manager[]=${mensajeroID}`;
    }
    if ( tramitadorID > 0 ) {
      url = `${url}&manager[]=${tramitadorID}`;
    }
    return this.http.get( url, { params } );
  }

  /**
   * 
   * @param id id de la orden a Aprobar/Rechacar
   * @param approved_payment  enum OrderStatus
   * @returns 
   */
  approveDecline( id: number, approved_payment: OrderStatus ): Observable<BaseResponse<any>> {
    return this.http.put( `orders/${id}`, { approved_payment } );
  }

  tramitadores(): Observable<any> {
    return this.http.get( `users-crud?roles[]=manager.processor&roles[]=manager.lawyer` )
  }

  mensajeros(): Observable<any> {
    return this.http.get( `users-crud?roles[]=manager.messenger` );
  }

  reportPaymentVerification( page = 1, start_date: string, end_date: string, status: any ): Observable<any> {
    return this.http.get( `orders?page=${page}&approved_payment=${status}&start_date=${start_date}&end_date=${end_date}&with[]=procedure` );
  }

}
