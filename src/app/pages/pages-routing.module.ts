
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// dashboard
import { DashboardComponent } from './dashboard/dashboard.component';


// Users
import { UsersComponent } from './users/users.component';

// Approval
import { TramitadoresPartnersComponent } from './approval/tramitadores-partners/tramitadores-partners.component';
import { MessengersPartnersComponent } from './approval/messengers-partners/messengers-partners.component';

// Monitoring
import { MonitoringComponent } from './monitoring/monitoring.component';


// Config
import { BanksComponent } from './config/banks/banks.component';
import { RequirementsComponent } from './config/requirements/requirements.component';
import { InstitutionsComponent } from './config/institutions/institutions.component';
import { ProcedureComponent } from './config/procedure/procedure.component';

//availability
import { AvailabilityComponent } from './availability/availability.component';
import { PaymentVerificationComponent } from './finance/payment-verification/payment-verification.component';


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
  {
    path: "users",
    component: UsersComponent
  },
  {
    path: "approval/tramitadores",
    component: TramitadoresPartnersComponent
  },
  {
    path: "approval/messengers",
    component: MessengersPartnersComponent
  },
  {
    path: "monitoring",
    component: MonitoringComponent
  },
  {
    path: "config/banks",
    component: BanksComponent
  },
  {
    path: "availability",
    component: AvailabilityComponent
  },
  {
    path: "config/requirements",
    component: RequirementsComponent
  },
  {
    path: "config/institutions",
    component: InstitutionsComponent
  },
  {
    path: "config/procedure",
    component: ProcedureComponent
  }, {
    path: 'finance/payment-verification',
    component: PaymentVerificationComponent
  }
];

@NgModule( {
  imports: [ RouterModule.forChild( routes ) ],
  exports: [ RouterModule ]
} )
export class PagesRoutingModule { }
