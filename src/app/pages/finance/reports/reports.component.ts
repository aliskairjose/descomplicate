import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import Swal from 'sweetalert2';

@Component( {
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: [ './reports.component.scss' ]
} )
export class ReportsComponent implements OnInit {

  end_date: any;
  start_date: any;
  modal: any;

  constructor(
    private titleService: Title,
  ) {
    this.titleService.setTitle( 'Descomplicate-Reporte Verificación de pago' );

  }

  ngOnInit(): void {
  }

  openFilterModal( filterModal: any ): void {

  }

}
