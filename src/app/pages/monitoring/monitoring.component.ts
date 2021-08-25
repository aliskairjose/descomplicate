import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../shared/service/order.service';
import { Order } from '../../shared/interfaces/order';

@Component( {
  selector: 'app-monitoring',
  templateUrl: './monitoring.component.html',
  styleUrls: [ './monitoring.component.scss' ]
} )
export class MonitoringComponent implements OnInit {
  item: Order[] = [];

  constructor(
    private orderService: OrderService,
  ) { }

  ngOnInit(): void {
    this.loadData();
  }


  private loadData(): void {
    this.orderService.procedureList().subscribe( response => {
      if ( response.status === 'Success' ) {
        this.item = [ ...response.data ];
      }
    } )
  }

}
