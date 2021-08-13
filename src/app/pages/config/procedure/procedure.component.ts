import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Procedure } from 'src/app/shared/interfaces/procedure';
import { ProcedureService } from 'src/app/shared/service/procedure.service';
import Swal from 'sweetalert2';

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

  constructor(
    private fb: FormBuilder,
    private titleService: Title,
    private procedureSrv: ProcedureService,
  ) {
    this.createForm();
    this.titleService.setTitle( 'Descomplicate - Requisitos' );
  }

  get f() { return this.form.controls; }

  ngOnInit(): void {
    this.loadData();
  }

  onSubmit(): void {
    this.submitted = true;
    if ( this.form.valid ) {
      ( this.procedure ) ? this.updateProcedure() : this.createProcedure();
    }
  }

  add(): void {
    this.isEdit = false;
    this.createForm();
  }

  update( pro: Procedure ): void {
    this.isEdit = true;
    this.procedure = { ...pro };
    // this.form.controls.name.patchValue( req.name );
  }

  delete( id: number ): void {
    this.deleteProcedure( id );
  }

  private loadData(): void {
    this.procedureSrv.list().subscribe( response => {
      if ( response.status === 'Success' ) {
        this.procedures = [ ...response.data ];
      }
    } );
  }

  private createProcedure(): void {
    this.procedureSrv.store( this.form.value ).subscribe( response => {
      if ( response.status === 'Success' ) {
        document.getElementById( "close" )?.click();
        this.procedures.push( response.data );
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
        cost: [ '' ],
        estimated_time: [],
        institution_id: [],
        requeriments: [],
        managerTypes: []
      }
    );
  }


}
