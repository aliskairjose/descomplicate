import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Institution } from 'src/app/shared/interfaces/institution';
import { InstitutionService } from 'src/app/shared/service/institution.service';

@Component( {
  selector: 'app-institutions',
  templateUrl: './institutions.component.html',
  styleUrls: [ './institutions.component.scss' ]
} )
export class InstitutionsComponent implements OnInit {

  form!: FormGroup;
  submitted = false;
  institutions: Institution[] = [];
  institution!: Institution;
  isEdit = false;

  constructor(
    private titleSrv: Title,
    private fb: FormBuilder,
    private iSrv: InstitutionService,
  ) {
    this.createForm();
    this.titleSrv.setTitle( 'Descomplicate-Instituciones' );
  }

  get f() { return this.form.controls; }

  ngOnInit(): void {
    this.loadData();
  }

  onSubmit(): void {
    this.submitted = true;
    if ( this.form.valid ) {
      ( this.institution ) ? this.updateInstitution() : this.createInstitution();
    }
  }

  add(): void {
    this.isEdit = false;
    this.createForm();
  }

  update( inst: Institution ): void {
    this.isEdit = true;
    this.institution = { ...inst };
    this.form.controls.name.patchValue( inst.name );
    this.form.controls.address.patchValue( inst.address );
  }

  delete( id: number ): void {
    this.deleteinstitution( id );
  }

  private loadData(): void {
    this.iSrv.list().subscribe( response => {
      if ( response.status === 'Success' ) {
        this.institutions = [ ...response.data ];
      }
    } )
  }

  private createForm(): void {
    this.form = this.fb.group(
      {
        name: [ '', Validators.required ],
        address: [ '', Validators.required ]
      }
    );
  }

  private createInstitution(): void {
    this.isEdit = false;
    this.iSrv.store( this.form.value ).subscribe( response => {
      if ( response.status === 'Success' ) {
        document.getElementById( "close" )?.click();
        this.institutions.push( response.data );
        Swal.fire( '', response.message, 'success' );
      }
    } );
  }

  private updateInstitution(): void {
    this.iSrv.update( this.institution.id, this.form.value ).subscribe( response => {
      if ( response.status === 'Success' ) {
        Swal.fire( '', response.message, 'success' );
        document.getElementById( "close" )?.click();
        this.loadData();
      }
    } );
  }

  private deleteinstitution( id: number ): void {
    this.iSrv.delete( id ).subscribe( response => {
      if ( response.status === 'Success' ) {
        Swal.fire( '', response.message, 'success' );
        document.getElementById( "close" )?.click();
        this.loadData();
      }
    } );
  }
}
