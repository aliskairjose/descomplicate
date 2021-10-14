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
  types = [
    {
      value: 1,
      name: 'Abogado socio',
    },
    {
      value: 2,
      name: 'Tramitador socio',
    },
    {
      value: 3,
      name: 'Mensajero socio',
    },
  ]
  managerTypesSelected: any[] = []

  constructor(
    private fb: FormBuilder,
    private titleService: Title,
    private procedureSrv: ProcedureService,
    private reqService: RequirementService,
    private instService: InstitutionService,
  ) {
    this.createForm();
    this.titleService.setTitle( 'Descomplicate - Requisitos' );
    forkJoin( [ this.instService.list(), this.reqService.list() ] ).
      subscribe( ( [ instResponse, requirementsResponse ] ) => {
        this.requirements = [ ...requirementsResponse.data ];
        this.institutions = [ ...instResponse.data ];
      } );
  }

  get f() { return this.form.controls; }

  ngOnInit(): void {
    this.loadData();
    // note: The JavaScript version is available in the jsfiddle demo
    const separator = ',';
    for ( const input of document.getElementsByTagName( 'input' ) ) {
      if ( !input.multiple ) {
        continue;
      }

      if ( input.list instanceof HTMLDataListElement ) {
        const optionsValues = Array.from( input.list.options ).map( ( opt: any ) => opt.value );
        let valueCount = input.value.split( separator ).length;

        input.addEventListener( "input", () => {
          const currentValueCount = input.value.split( separator ).length;

          // Do not update list if the user doesn't add/remove a separator
          // Current value: "a, b, c"; New value: "a, b, cd" => Do not change the list
          // Current value: "a, b, c"; New value: "a, b, c," => Update the list
          // Current value: "a, b, c"; New value: "a, b" => Update the list
          if ( valueCount !== currentValueCount ) {
            const lsIndex = input.value.lastIndexOf( separator );
            const str = lsIndex !== -1 ? input.value.substr( 0, lsIndex ) + separator : "";
            filldatalist( input, optionsValues, str );
            valueCount = currentValueCount;
          }
        } );
      }
    }

    function filldatalist( input: HTMLInputElement, optionValues: string[], optionPrefix: string ) {
      const list = input.list;
      if ( list && optionValues.length > 0 ) {
        list.innerHTML = "";

        const usedOptions = optionPrefix.split( separator ).map( value => value.trim() );

        for ( const optionsValue of optionValues ) {
          if ( usedOptions.indexOf( optionsValue ) < 0 ) { // Skip used values
            const option = document.createElement( "option" );
            option.value = optionPrefix + optionsValue;
            list.append( option );
          }
        }
      }
    }
  }

  onSubmit(): void {
    this.submitted = true;
    if ( this.form.valid ) {
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
    this.isEdit = true;
    this.procedure = { ...pro };
    const result = this.institutions.find( item => item.id === pro.institution_id );
    this.form.controls.institution.patchValue( result?.name );
    this.managerTypesSelected = this.procedure.manager_types;
    this.form.controls.name.patchValue( pro.name );
    this.form.controls.estimated_time.patchValue( pro.estimated_time );
    this.form.controls.cost.patchValue( pro.cost );
    this.form.controls.institution_id.patchValue( pro.institution_id );
    this.form.controls.managerTypes.patchValue( pro.manager_types );
    this.form.controls.requeriments.patchValue( pro.requeriments );
  }

  delete( id: number ): void {
    this.deleteProcedure( id );
  }

  compareObjects( o1: any, o2: any ): boolean {
    return ( o1 === o2.id );
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
        institution: [ '', [ Validators.required ] ],
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
