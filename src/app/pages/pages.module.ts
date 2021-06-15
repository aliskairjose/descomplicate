import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { PagesRoutingModule } from './pages-routing.module';
import { LoginAdminComponent } from './auth/login-admin/login-admin.component';
import { PasswordRecoveryComponent } from './password-recovery/password-recovery.component';
import { MessagePassRecoveryComponent } from './password-recovery/message-pass-recovery/message-pass-recovery.component';


@NgModule({
  declarations: [
    LoginAdminComponent,
    PasswordRecoveryComponent,
    MessagePassRecoveryComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    SharedModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class PagesModule { }
