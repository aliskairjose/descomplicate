import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// dashboard
import { DashboardComponent } from './dashboard/dashboard.component';


// Users
// import { UsersComponent } from './users/users.component';

// Approval
import { TramitadoresPartnersComponent } from './approval/tramitadores-partners/tramitadores-partners.component';
import { MessengersPartnersComponent } from './approval/messengers-partners/messengers-partners.component';

// Monitoring
// import { MonitoringComponent } from './monitoring/monitoring.component';


// Config
import { BanksComponent } from './config/banks/banks.component';
import { RequirementsComponent } from './config/requirements/requirements.component';
import { InstitutionsComponent } from './config/institutions/institutions.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: "dashboard",
    component: DashboardComponent
  },
  // {
  //   path : "users",
  //   component: UsersComponent
  // },
  {
    path: "approval/tramitadores",
    component: TramitadoresPartnersComponent
  },
  {
    path: "approval/messengers",
    component: MessengersPartnersComponent
  },
  // {
  //   path : "monitoring",
  //   component: MonitoringComponent
  // },
  {
    path: "config/banks",
    component: BanksComponent
  },
  {
    path: "config/requirements",
    component: RequirementsComponent
  },
  {
    path: "config/institutions",
    component: InstitutionsComponent
  }

];

@NgModule( {
  imports: [ RouterModule.forChild( routes ) ],
  exports: [ RouterModule ]
} )
export class PagesRoutingModule { }
