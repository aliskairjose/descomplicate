import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PagesRoutingModule } from './pages-routing.module';

// Auth 
import { LoginAdminComponent } from './auth/login-admin/login-admin.component';
import { PasswordRecoveryComponent } from './password-recovery/password-recovery.component';
import { MessagePassRecoveryComponent } from './password-recovery/message-pass-recovery/message-pass-recovery.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { MessageResetPassComponent } from './auth/reset-password/message-reset-pass/message-reset-pass.component';
// Dashboard
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent } from './users/users.component';
import { TramitadoresPartnersComponent } from './approval/tramitadores-partners/tramitadores-partners.component';
import { MessengersPartnersComponent } from './approval/messengers-partners/messengers-partners.component';
import { CardDataApprovalComponent } from './approval/card-data-approval/card-data-approval.component';
import { MonitoringComponent } from './monitoring/monitoring.component';
import { BanksComponent } from './config/banks/banks.component';
import { RequirementsComponent } from './config/requirements/requirements.component';
import { InstitutionsComponent } from './config/institutions/institutions.component';


@NgModule({
  declarations: [
    LoginAdminComponent,
    PasswordRecoveryComponent,
    MessagePassRecoveryComponent,
    ResetPasswordComponent,
    MessageResetPassComponent,
    DashboardComponent,
    UsersComponent,
    TramitadoresPartnersComponent,
    MessengersPartnersComponent,
    CardDataApprovalComponent,
    MonitoringComponent,
    BanksComponent,
    RequirementsComponent,
    InstitutionsComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class PagesModule { }
