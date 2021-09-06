import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NgbCalendar, NgbDateParserFormatter, NgbActiveModal, NgbModal, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import Swal, { SweetAlertIcon } from 'sweetalert2';
import { Page } from '../../../shared/interfaces/response';
import { OrderService } from '../../../shared/service/order.service';
@Component( {
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: [ './reports.component.scss' ]
} )
export class ReportsComponent implements OnInit {

  end_date: any;
  start_date: any;
  modal: any;
  reports: any[] = [];
  paginator!: Page;
  page = 1;
  paymentStatus: any = '';
  fromDate!: NgbDate;
  toDate!: NgbDate;

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
    this.fromDate = this.toDate = this.calendar.getToday();
    this.loadData();
  }

  ngOnInit(): void {
  }

  openFilterModal( filterModal: any ): void {
    this.modal = this.modalService.open( filterModal, { size: 'lg' } );
    this.modal.result.then( () => {
      // if ( this.fromDate.after( this.toDate ) ) {
      //   const message = 'La fecha final no puede ser anterior a la fecha de inicio';
      //   Swal.fire( '', message, 'warning' );
      //   return;
      // }
      this.start_date = this.formatter.format( this.fromDate );
      this.end_date = this.formatter.format( this.toDate );
      this.loadData();
    } );
  }

  pageChange( page: number ): void {
    this.page = page;
    this.paginator.currentPage = page;
    this.loadData();
  }

  download(): void {
    this.orderService.downloadFinanceReport( this.start_date, this.end_date, this.paymentStatus ).subscribe( response => {
      const blob = new Blob( [ response ], { type: 'application/pdf' } );

      var downloadURL = window.URL.createObjectURL( response );
      var link = document.createElement( 'a' );
      link.href = downloadURL;
      link.download = "Reporte Verificación de Pagos.pdf";
      link.click();
    } );
  }

  private loadData( page = 1 ): void {
    this.orderService.reportPaymentVerification( page, this.start_date, this.end_date, this.paymentStatus ).subscribe( response => {
      console.log( response );
      this.reports = [ ...response.data ];
      this.paginator = response.meta?.page as Page;
    } );
  }
}
