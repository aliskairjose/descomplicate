import { Component, OnInit } from '@angular/core';
import { OrderService, OrderStatus } from 'src/app/shared/service/order.service';
import { Title } from '@angular/platform-browser';
import { Order } from '../../../shared/interfaces/order';
import Swal from 'sweetalert2';

@Component( {
  selector: 'app-payment-verification',
  templateUrl: './payment-verification.component.html',
  styleUrls: [ './payment-verification.component.scss' ]
} )
export class PaymentVerificationComponent implements OnInit {

  orders: Order[] = [];

  constructor(
    private titleService: Title,
    private orderService: OrderService,

  ) {
    this.titleService.setTitle( 'Descomplicate-Verificación de pago' );
  }

  ngOnInit(): void {
    this.loadData();
  }

  /**
   * 
   * @param order 
   */
  updateOrderStatus( id: number, status: OrderStatus ): void {
    let approved_payment = status;
    this.orderService.approveDecline( id, approved_payment ).subscribe( response => {
      console.log( response );
      if ( response.status === 'Success' ) {
        Swal.fire( '', response.message, 'success' );
        this.loadData();
      }
    } );
  }


  private loadData(): void {
    this.orderService.paymentVerificationList().subscribe( response => {
      console.log( response );
      if ( response.status === 'Success' ) {
        this.orders = [ ...response.data ];
      }
    } );
  }
}
