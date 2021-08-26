import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../shared/service/order.service';
import { Order } from '../../shared/interfaces/order';
import { from, forkJoin } from 'rxjs';
import { pluck } from 'rxjs/operators';
import { Page } from '../../shared/interfaces/response';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProcedureService } from '../../shared/service/procedure.service';
import { Procedure } from '../../shared/interfaces/procedure';
import { InstitutionService } from '../../shared/service/institution.service';
import { Institution } from 'src/app/shared/interfaces/institution';

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
  paginator!: Page;
  page = 1;
  procedures: Procedure[] = [];
  institutions: Institution[] = [];
  params = {
    process: 0,
    pending: 0,
    ready: 0,
    procedure_id: 0,
    institution_id: 0
  }

  constructor(
    private modalService: NgbModal,
    public activeModal: NgbActiveModal,
    private orderService: OrderService,
    private procedureService: ProcedureService,
    private institutionService: InstitutionService,
  ) {
    this.institutionService.list().subscribe( response => { this.institutions = [ ...response.data ] } );
  }

  ngOnInit(): void {
    this.loadData();
    console.log( this.params )
  }

  pageChange( page: number ): void {
    this.page = page;
    this.paginator.currentPage = page;
    this.loadData();
  }

  // Filtrado desde los botones
  filter( type: string ): void {

    if ( type === 'ready' ) {
      ( this.params.ready ) ? this.params.ready = 0 : this.params.ready = 1;
      this.params.pending = 0;
      this.params.process = 0;
    }
    if ( type === 'pending' ) {
      ( this.params.pending ) ? this.params.pending = 0 : this.params.pending = 1;
      this.params.process = 0;
      this.params.ready = 0;
    }
    if ( type === 'process' ) {
      ( this.params.process ) ? this.params.process = 0 : this.params.process = 1;
      this.params.ready = 0;
      this.params.pending = 0;
    }
    this.loadData();
  }

  openFilterModal( filterModal: any ): void {
    this.modalService.open( filterModal );
  }

  onInstitutionChange( event: any ): void {
    const id = event.target.value;
    this.procedureService.list( 1, id ).subscribe( response => {
      this.procedures = [ ...response.data ];
    } )
  }

  private loadData(): void {
    this.orderService.procedureList( this.page, this.params ).subscribe( response => {
      this.pendings = 0;
      this.inProcess = 0;
      this.culminated = 0;
      if ( response.status === 'Success' ) {
        this.item = [ ...response.data ];
        this.paginator = response.meta?.page as Page;

        from( response.data ).pipe( pluck( 'status' ) ).subscribe( item => {
          if ( item?.id === 1 ) { this.pendings++; }
          if ( item?.id === 7 ) { this.inProcess++; }
          if ( item?.id === 8 ) { this.culminated++; }
        } );
      }
    } )
  }

}
