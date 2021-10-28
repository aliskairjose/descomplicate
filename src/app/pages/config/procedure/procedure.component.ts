import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { forkJoin, from } from 'rxjs';
import { Institution } from 'src/app/shared/interfaces/institution';
import { Procedure } from 'src/app/shared/interfaces/procedure';
import { Requirement } from 'src/app/shared/interfaces/requirement';
import { ProcedureService } from 'src/app/shared/service/procedure.service';
import { RequirementService } from 'src/app/shared/service/requirement.service';
import Swal from 'sweetalert2';
import { InstitutionService } from '../../../shared/service/institution.service';
import { Page } from '../../../shared/interfaces/response';
import { CompensatoryExpenseType } from '../../../shared/interfaces/compenatory-expense-type';
import { CompensatoryExpenseTypeService } from '../../../shared/service/compensatory-expense-type.service';
import { GetdataService } from 'src/app/shared/service/getdata.service';

@Component( {
  selector: 'app-procedure',
  templateUrl: './procedure.component.html',
  styleUrls: [ './procedure.component.scss' ]
} )
export class ProcedureComponent implements OnInit {

  form!: FormGroup;
  submitted = false;
  procedures: Procedure[] = [];
  procedure!: Procedure;

  isEdit = false;
  institutions: Institution[] = [];
  requirements: Requirement[] = [];
  compensatoryExpense: CompensatoryExpenseType[] = [];

  compensatoryExpenseString: string[] = [];
  paginator!: Page;
  page = 1;
  tiposDeGestoria: any[] = [];

  expensesSelecteds: number[] = [];
  requirementsSelected: number[] = [];

  constructor(
    private fb: FormBuilder,
    private titleService: Title,
    private dataService: GetdataService,
    private procedureSrv: ProcedureService,
    private reqService: RequirementService,
    private instService: InstitutionService,
    private compensatoryExpeseService: CompensatoryExpenseTypeService,
  ) {
    this.createForm();
    this.titleService.setTitle( 'Descomplicate - Requisitos' );
    forkJoin( [
      this.instService.list(),
      this.reqService.list(),
      this.compensatoryExpeseService.list(),
      this.dataService.getManagerTypes()
    ] ).
      subscribe( ( [
        instResponse,
        requirementsResponse,
        compensatoryResponse,
        typesResponse
      ] ) => {
        this.requirements = [ ...requirementsResponse.data ];
        this.institutions = [ ...instResponse.data ];
        this.compensatoryExpense = [ ...compensatoryResponse.data ];
        this.tiposDeGestoria = [ ...typesResponse.data ];
        from( this.compensatoryExpense ).subscribe( ( ce ) => this.compensatoryExpenseString.push( `${ce.name} - ${ce.amount} $` ) );
      } );
  }

  get f() { return this.form.controls; }

  ngOnInit(): void {
    this.loadData();
  }

  onSubmit(): void {
    this.submitted = true;
    if ( this.form.valid ) {
      const _managerTypes = this.form.controls.managerTypes.value;
      if ( Object.keys( _managerTypes[ 0 ] ).length ) {
        const ids: number[] = [];
        from( this.form.controls.managerTypes.value ).subscribe( ( item: any ) => ids.push( item.id as number ) );
        this.form.controls.managerTypes.setValue( ids );
      }
      this.form.controls.compensatory_expense_types.setValue( this.expensesSelecteds );
      this.form.controls.requeriments.setValue( this.requirementsSelected );
      ( this.isEdit ) ? this.updateProcedure() : this.createProcedure();
    }
  }

  selectInstitution( event: any ): void {
    const value = event.target.value;
    const inst = this.institutions.find( item => item.name === value );
    this.form.controls.institution_id.setValue( inst?.id );
  }

  trackByType( index: number, item: any ): number {
    return item.id;
  }

  add(): void {
    this.isEdit = false;
    this.createForm();
  }

  update( pro: Procedure ): void {
    console.log( pro )
    const reqs: string[] = [];
    const expenses: string[] = [];
    const managerTypesId: number[] = [];

    this.isEdit = true;
    this.procedure = { ...pro };

    const result = this.institutions.find( item => item.id === pro.institution_id );
    this.form.controls.institution.patchValue( result?.name );

    this.form.controls.name.patchValue( pro.name );
    this.form.controls.estimated_time.patchValue( pro.estimated_time );

    this.form.controls.cost.patchValue( pro.cost );
    this.form.controls.institution_id.patchValue( pro.institution_id );

    from( pro.manager_types ).subscribe( ( item: any ) => managerTypesId.push( item.id ) );
    from( pro.requeriments ).subscribe( req => reqs.push( req.name ) );
    from( pro.compensatories ).subscribe( comp => expenses.push( `${comp.name} - ${comp.amount}$` ) );

    this.form.controls.managerTypes.patchValue( pro.manager_types );
    this.form.controls.requeriments.patchValue( reqs );
    this.form.controls.compensatory_expense_types.patchValue( expenses );
  }

  delete( id: number ): void {
    this.deleteProcedure( id );
  }

  compareObjects( o1: any, o2: any ): boolean {
    return ( o1 === o2.id );
  }

  onChangeExpenses( event: any ): void {
    let _expense: string[] = [];
    const _expenseIds: number[] = [];

    // _expense = event.target.value.split( '$,' );
    _expense = event.value;
    from( _expense ).subscribe( ( data: any ) => {
      const index = data.indexOf( '-' );
      const expenseSlice = data.slice( 0, index - 1 );
      const expense = this.compensatoryExpense.find( item => item.name === expenseSlice );
      _expenseIds.push( expense?.id as number );

    } );
    this.expensesSelecteds = _expenseIds;
  }

  onChangeRequirements( event: any ): void {
    let _requirement: string[] = [];
    const _requirementsId: number[] = [];
    _requirement = event.target.value.split( ',' );

    from( _requirement ).subscribe( ( data: any ) => {
      const req = this.requirements.find( item => item.name === data );
      _requirementsId.push( req?.id as number );
    } );

    this.requirementsSelected = _requirementsId;
  }

  private loadData(): void {
    this.procedureSrv.list( this.page ).subscribe( response => {
      if ( response.status === 'Success' ) {
        this.procedures = [ ...response.data ];
        this.paginator = response.meta?.page as Page;
      }
    } );
  }

  private createProcedure(): void {
    this.procedureSrv.store( this.form.value ).subscribe( response => {
      if ( response.status === 'Success' ) {
        document.getElementById( "close" )?.click();
        this.loadData();
        Swal.fire( '', response.message, 'success' );
      }
    } );
  }

  private updateProcedure(): void {
    this.procedureSrv.update( this.procedure.id, this.form.value ).subscribe( response => {
      if ( response.status === 'Success' ) {
        Swal.fire( '', response.message, 'success' );
        document.getElementById( "close" )?.click();
        this.loadData();
      }
    } );
  }

  private deleteProcedure( id: number ): void {
    this.procedureSrv.delete( id ).subscribe( response => {
      if ( response.status === 'Success' ) {
        Swal.fire( '', response.message, 'success' );
        document.getElementById( "close" )?.click();
        this.loadData();
      }
    } );
  }

  private createForm(): void {
    this.form = this.fb.group(
      {
        name: [ '', [ Validators.required ] ],
        cost: [ '', [ Validators.required ] ],
        estimated_time: [ '1' ],
        requires_activation: [ false ],
        institution_id: [ '', [ Validators.required ] ], // solo para front
        requeriments: [ '', [ Validators.required ] ],
        institution: [ '', [ Validators.required ] ],
        managerTypes: [ '', [ Validators.required ] ],
        compensatory_expense_types: [ '' ]
      }
    );
  }

  pageChange( page: number ): void {
    this.page = page;
    this.paginator.currentPage = page;
    this.loadData();
  }

  Clean() {
    this.procedure = <Procedure> {};
    this.isEdit &&= false;
  }

}
