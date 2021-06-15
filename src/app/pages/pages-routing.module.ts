

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// LOGIN
import { LoginAdminComponent } from './auth/login-admin/login-admin.component';
// PasswordRecovery
import { PasswordRecoveryComponent } from './password-recovery/password-recovery.component';
import { MessagePassRecoveryComponent } from './password-recovery/message-pass-recovery/message-pass-recovery.component';

const routes: Routes = [
  { 
    path: '',   redirectTo: 'login', pathMatch: 'full' 
  },
  {
		path: 'login',
		component: LoginAdminComponent,
	},  
  {
		path: 'password-recovery',
		component: PasswordRecoveryComponent,
	},
  {
    path : "message-pass-recovery",
    component : MessagePassRecoveryComponent
  }
	
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
