import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component( {
  selector: 'app-institutions',
  templateUrl: './institutions.component.html',
  styleUrls: [ './institutions.component.scss' ]
} )
export class InstitutionsComponent implements OnInit {

  form!: FormGroup;
  submitted = false;
  institutions: any[] = [];

  constructor(
    private fb: FormBuilder,
    private titleSrv: Title
  ) {
    this.createForm();
    this.titleSrv.setTitle( 'Descomplicate-Instituciones' );
  }

  get f() { return this.form.controls; }

  ngOnInit(): void {
    this.loadData();
  }

  private loadData(): void {

  }

  private createForm(): void {
    this.form = this.fb.group(
      {

      }
    );
  }

}
