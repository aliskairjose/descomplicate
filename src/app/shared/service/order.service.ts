import { Injectable } from '@angular/core';
import { HttpserviceService } from 'src/app/shared/service/httpservice.service';
import { Observable } from 'rxjs';
import { BaseResponse } from '../interfaces/response';
import { Order } from '../interfaces/order';

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
}
