import { Component, OnInit } from '@angular/core';
import { OrderService, OrderStatus } from 'src/app/shared/service/order.service';
import { Title } from '@angular/platform-browser';
import { Order } from '../../../shared/interfaces/order';
import Swal from 'sweetalert2';
import { Page } from '../../../shared/interfaces/response';

@Component( {
  selector: 'app-payment-verification',
  templateUrl: './payment-verification.component.html',
  styleUrls: [ './payment-verification.component.scss' ]
} )
export class PaymentVerificationComponent implements OnInit {

  orders: Order[] = [];
  paginator!: Page;
  page = 1;

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
      if ( response.status === 'Success' ) {
        Swal.fire( '', response.message, 'success' );
        this.loadData();
      }
    } );
  }

  pageChange( page: number ): void {
    this.page = page;
    this.paginator.currentPage = page;
    this.loadData();
  }

  private loadData(): void {
    this.orderService.paymentVerificationList( this.page ).subscribe( response => {
      if ( response.status === 'Success' ) {
        this.paginator = response.meta?.page as Page;
        this.orders = [ ...response.data ];
      }
    } );
  }
}
