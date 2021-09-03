import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NgbCalendar, NgbDateParserFormatter, NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { Page } from '../../../shared/interfaces/response';
import { OrderService, ApprovePayment } from '../../../shared/service/order.service';

@Component( {
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: [ './reports.component.scss' ]
} )
export class ReportsComponent implements OnInit {

  end_date: any;
  start_date: any;
  modal: any;
  reports = [];
  paginator!: Page;
  page = 1;
  paymentStatus: any = '';

  constructor(
    private titleService: Title,
    private calendar: NgbCalendar,
    private modalService: NgbModal,
    public activeModal: NgbActiveModal,
    private orderService: OrderService,
    public formatter: NgbDateParserFormatter,

  ) {
    this.titleService.setTitle( 'Descomplicate-Reporte Verificación de pago' );
    this.start_date = this.end_date = this.formatter.format( this.calendar.getToday() );
    this.loadData();
  }

  ngOnInit(): void {
  }

  openFilterModal( filterModal: any ): void {
    this.modal = this.modalService.open( filterModal, { backdrop: 'static' } );
    this.modal.result.then( () => {
      // if ( this.start_date ) { this.params.start_date = this.formatter.format( this.start_date ); }
      // if ( this.end_date ) { this.params.end_date = this.formatter.format( this.end_date ); }
      this.loadData();
    } );
  }

  pageChange( page: number ): void {
    this.page = page;
    this.paginator.currentPage = page;
    this.loadData();
  }

  private loadData( page = 1 ): void {
    this.orderService.reportPaymentVerification( page, this.start_date, this.end_date, this.paymentStatus ).subscribe( response => {
      console.log( response );
      this.paginator = response.meta?.page as Page;
    } );
  }
}
