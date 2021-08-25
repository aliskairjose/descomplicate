import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/shared/service/order.service';
import { Title } from '@angular/platform-browser';
import { Order } from '../../../shared/interfaces/order';

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

  private loadData(): void {
    this.orderService.paymentVerificationList().subscribe( response => {
      console.log( response );
      if ( response.status === 'Success' ) {
        this.orders = [ ...response.data ];
      }
    } );
  }
}
