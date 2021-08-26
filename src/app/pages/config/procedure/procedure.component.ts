import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { forkJoin } from 'rxjs';
import { Institution } from 'src/app/shared/interfaces/institution';
import { Procedure } from 'src/app/shared/interfaces/procedure';
import { Requirement } from 'src/app/shared/interfaces/requirement';
import { ProcedureService } from 'src/app/shared/service/procedure.service';
import { RequirementService } from 'src/app/shared/service/requirement.service';
import Swal from 'sweetalert2';
import { InstitutionService } from '../../../shared/service/institution.service';
import { Page } from '../../../shared/interfaces/response';

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
  paginator!: Page;
  page = 1;

  constructor(
    private fb: FormBuilder,
    private titleService: Title,
    private procedureSrv: ProcedureService,
    private reqService: RequirementService,
    private instService: InstitutionService,
  ) {
    this.createForm();
    this.titleService.setTitle( 'Descomplicate - Requisitos' );
    forkJoin( [ this.instService.list( this.page ), this.reqService.list( this.page ) ] ).
      subscribe( ( [ instResponse, requirementsResponse ] ) => {
        this.requirements = [ ...requirementsResponse.data ];
        this.institutions = [ ...instResponse.data ];
      } );
  }

  get f() { return this.form.controls; }

  ngOnInit(): void {
    this.loadData();
  }

  onSubmit(): void {
    this.submitted = true;
    if ( this.form.valid ) {
      ( this.procedure.id != undefined ) ? this.updateProcedure() : this.createProcedure();
    }
  }

  add(): void {
    this.isEdit = false;
    this.createForm();
  }

  update( pro: Procedure ): void {
    this.isEdit = true;
    this.procedure = { ...pro };
    this.form.controls.name.patchValue( pro.name );
    this.form.controls.estimated_time.patchValue( pro.estimated_time );
    this.form.controls.cost.patchValue( pro.cost );
    this.form.controls.institution_id.patchValue( pro.institution_id );
  }

  delete( id: number ): void {
    this.deleteProcedure( id );
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
        institution_id: [ '', [ Validators.required ] ],
        requeriments: [ '', [ Validators.required ] ],
        managerTypes: [ '', [ Validators.required ] ]
      }
    );
  }

  pageChange( page: number ): void {
    this.page = page;
    this.paginator.currentPage = page;
    this.loadData();
  }

  Clean() {

    if ( this.isEdit ) {
      this.procedure = <Procedure> {};
      this.isEdit = !this.isEdit;

    }
  }

}
