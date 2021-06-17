
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages/pages.component';
// 
// LOGIN
import { LoginAdminComponent } from './pages/auth/login-admin/login-admin.component';
// PasswordRecovery
import { PasswordRecoveryComponent } from './pages/password-recovery/password-recovery.component';
import { MessagePassRecoveryComponent } from './pages/password-recovery/message-pass-recovery/message-pass-recovery.component';
// reset password
import { ResetPasswordComponent } from './pages/auth/reset-password/reset-password.component';
import { MessageResetPassComponent } from './pages/auth/reset-password/message-reset-pass/message-reset-pass.component';
// dashboard
import { DashboardComponent } from './pages/dashboard/dashboard.component';

const routes: Routes = [
    {
      path: '',
      redirectTo: 'pages/login',
      pathMatch: 'full'
    },
    {
      path: 'pages/login',
      component: LoginAdminComponent,
    },
    {
      path: 'pages/password-recovery',
      component: PasswordRecoveryComponent,
    },
    {
      path : "pages/message-pass-recovery",
      component : MessagePassRecoveryComponent
    },
    {
      path : "pages/reset-password",
      component : ResetPasswordComponent
    },
    {
      path : "pages/message-reset-pass",
      component: MessageResetPassComponent
    },
    
    {
      path: 'pages',
      component: PagesComponent,
      loadChildren: () => import( './pages/pages.module' ).then( m => m.PagesModule )
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
