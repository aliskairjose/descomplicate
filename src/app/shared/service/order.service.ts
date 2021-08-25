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

  paymentVerificationList(): Observable<BaseResponse<Order[]>> {
    return this.http.get( `orders?page=1&approved_payment=0&with[]=procedure` );
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

}
