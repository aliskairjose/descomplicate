import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../shared/service/order.service';
import { Order } from '../../shared/interfaces/order';
import { from } from 'rxjs';
import { pluck } from 'rxjs/operators';
import { ThrowStmt } from '@angular/compiler';

@Component( {
  selector: 'app-monitoring',
  templateUrl: './monitoring.component.html',
  styleUrls: [ './monitoring.component.scss' ]
} )
export class MonitoringComponent implements OnInit {
  item: Order[] = [];
  pendings = 0;
  culminated = 0;
  inProcess = 0;

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

        from( response.data ).pipe( pluck( 'status' ) ).subscribe( item => {
          if ( item?.id === 1 ) { this.pendings++; }
          if ( item?.id === 7 ) { this.inProcess++; }
          if ( item?.id === 8 ) { this.culminated++; }
        } );
      }
    } )
  }

}
