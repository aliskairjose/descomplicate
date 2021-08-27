import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../shared/service/order.service';
import { Order } from '../../shared/interfaces/order';
import { from, forkJoin } from 'rxjs';
import { pluck } from 'rxjs/operators';
import { Page } from '../../shared/interfaces/response';
import { NgbActiveModal, NgbDateParserFormatter, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProcedureService } from '../../shared/service/procedure.service';
import { Procedure } from '../../shared/interfaces/procedure';
import { InstitutionService } from '../../shared/service/institution.service';
import { Institution } from 'src/app/shared/interfaces/institution';
import { Manager } from '../../shared/interfaces/manager';

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
  procedures: any[] = [ { id: 0, name: 'Seleccionar' } ];
  institutions: any[] = [ { id: 0, name: 'Seleccionar' } ];
  params: any = {
    process: 0,
    pending: 0,
    ready: 0,
    procedure_id: 0,
    institution_id: 0,
    managers: []
  }
  tramitadores: any[] = [ { id: 0, name: 'Seleccionar' } ];
  mensajeros: any[] = [ { id: 0, name: 'Seleccionar' } ];
  modal: any;
  institution: any = null;
  procedure: any;
  mensajero: any;
  tramitador: any;

  constructor(
    private modalService: NgbModal,
    public activeModal: NgbActiveModal,
    private orderService: OrderService,
    private procedureService: ProcedureService,
    private formatter: NgbDateParserFormatter,
    private institutionService: InstitutionService,
  ) {
    forkJoin( [ this.institutionService.list(), this.orderService.mensajeros(), this.orderService.tramitadores() ] )
      .subscribe( ( [ response, mensajeroRespose, tramitadorResponse ] ) => {
        this.institutions.push( ...response.data );
        this.mensajeros.push( ...mensajeroRespose.data );
        this.tramitadores.push( ...tramitadorResponse.data );
      } );
  }

  ngOnInit(): void {
    this.loadData();
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
    this.modal = this.modalService.open( filterModal );
    this.modal.result.then( () => { this.loadData(); } );
  }

  onChange( event: any, type: string ): void {
    const id = event.target.value;
    if ( type === 'institution' ) {
      this.params.institution_id = id;
      if ( id == 0 ) {
        this.params.procedure_id = 0;
        this.procedures = [ { id: 0, name: 'Seleccionar' } ];
        return;
      }
      this.procedureService.list( 1, id ).subscribe( response => {
        this.procedures.push( ...response.data )
      } );
    }

    if ( type === 'procedure' ) {
      this.params.procedure_id = id;
    }
    if ( type === 'mensajero' ) {
      this.params.managers.push( id );
      this.mensajero = this.mensajeros.find( item => item.id == id );
    }
    if ( type === 'tramitador' ) {
      this.params.managers.push( id );
      this.tramitador = this.tramitadores.find( item => item.id == id )
    }

  }

  onDateSelect( event: any, type: string ): void {
    if ( type === 'start_date' ) { this.params.start_date = this.formatter.format( event ) }
    if ( type === 'end_date' ) { this.params.end_date = this.formatter.format( event ) }
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
