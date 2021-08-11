import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RequirementService } from '../../../shared/service/requirement.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Requirement } from 'src/app/shared/interfaces/requirement';

@Component( {
  selector: 'app-requirements',
  templateUrl: './requirements.component.html',
  styleUrls: [ './requirements.component.scss' ]
} )
export class RequirementsComponent implements OnInit {

  form!: FormGroup;
  submitted = false;
  requirements: Requirement[] = [];
  requirement!: Requirement;
  isEdit = false;

  constructor(
    private fb: FormBuilder,
    private titleService: Title,
    private regSrv: RequirementService
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
      ( this.requirement ) ? this.updateRequirement() : this.createRequirement();
    }
  }

  add(): void {
    this.isEdit = false;
    this.createForm();
  }

  update( req: Requirement ): void {
    this.isEdit = true;
    this.requirement = { ...req };
    this.form.controls.name.patchValue( req.name );
  }

  delete( id: number ): void {
    this.deleteRequirement( id );
  }

  private loadData(): void {
    this.regSrv.list().subscribe( response => {
      if ( response.status === 'Success' ) {
        this.requirements = [ ...response.data ];
      }
    } );
  }

  private createRequirement(): void {
    this.regSrv.store( this.form.value ).subscribe( response => {
      if ( response.status === 'Success' ) {
        document.getElementById( "close" )?.click();
        this.requirements.push( response.data );
        Swal.fire( '', response.message, 'success' );
      }
    } );
  }

  private updateRequirement(): void {
    this.regSrv.update( this.requirement.id, this.form.value ).subscribe( response => {
      if ( response.status === 'Success' ) {
        Swal.fire( '', response.message, 'success' );
        document.getElementById( "close" )?.click();
        this.loadData();
      }
    } )
  }

  private deleteRequirement( id: number ): void {
    this.regSrv.delete( id ).subscribe( response => {
      if ( response.status === 'Success' ) {
        Swal.fire( '', response.message, 'success' );
        document.getElementById( "close" )?.click();
        this.loadData();
      }
    } )
  }

  private createForm(): void {
    this.form = this.fb.group(
      {
        name: [ '', Validators.required ]
      }
    );
  }

}
