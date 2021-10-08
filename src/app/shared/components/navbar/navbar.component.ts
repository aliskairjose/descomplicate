import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';


@Component( {
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: [ './navbar.component.scss' ]
} )
export class NavbarComponent implements OnInit {
  @Output() newItemEvent = new EventEmitter<string>();
  status_menu: boolean = false;
  Pages = [ { pages: "", name_nav: "", status: false } ];
  Routername = "";

  constructor( private act_router: ActivatedRoute ) {
  }

  ngOnInit(): void {
    this.InitPages();
  }

  ngDoCheck() {
    const pages_active = this.act_router.snapshot.firstChild?.routeConfig?.path;
    const result_obj: any = this.Pages.find( item => item.pages === pages_active );
    this.Routername = result_obj.name_nav;
  }

  InitPages() {
    this.Pages = [
      { pages: "dashboard", name_nav: "Dashboard", status: false },
      { pages: "users", name_nav: "Usuarios", status: false },
      { pages: "approval/tramitadores", name_nav: "Tramitadores/Abogados socios por aprobar", status: false },
      { pages: "approval/messengers", name_nav: "Aprobaciones/Mensajeros socios", status: false },
      { pages: "monitoring", name_nav: "Monitoreo de trámites", status: false },
      { pages: "availability", name_nav: "Disponibilidad de Gestores", status: false },
      { pages: "config/banks", name_nav: "Configuración/Entidades Bancarias", status: false },
      { pages: "config/requirements", name_nav: "Configuración/Requisitos", status: false },
      { pages: "config/institutions", name_nav: "Configuración/Instituciones", status: false },
      { pages: "config/procedure", name_nav: "Configuración/Tramites", status: false },
      { pages: "finance/payment-verification", name_nav: "Verificacion de Pagos", status: false },
      { pages: "finance/report", name_nav: "Reporte Verificacion de Pagos", status: false },
    ]
  }

  addNewItem() {
    const value = ( this.status_menu ) ? '' : 'active';
    this.status_menu = !this.status_menu;
    this.newItemEvent.emit( value );
  }

}
