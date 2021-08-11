import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RequirementService } from '../../../shared/service/requirement.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component( {
  selector: 'app-requirements',
  templateUrl: './requirements.component.html',
  styleUrls: [ './requirements.component.scss' ]
} )
export class RequirementsComponent implements OnInit {

  form!: FormGroup;
  submitted = false;

  requirements: any[] = [];

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
      console.log( this.form.value );
      this.regSrv.store( this.form.value ).subscribe( response => {
        console.log( response );
        if ( response.status === 'Success' ) {
          this.requirements.push( response.data );
          Swal.fire( '', "Registro Exitoso", 'success' );
        }
      } );

    }
  }

  private loadData(): void {
    this.regSrv.list().subscribe( response => {
      if ( response.status === 'Success' ) {
        this.requirements = [ ...response.data ];
      }
    }
    );
  }

  private createForm(): void {
    this.form = this.fb.group(
      {
        name: [ '', Validators.required ]
      }
    );
  }

}
