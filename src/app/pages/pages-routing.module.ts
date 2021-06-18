

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// dashboard
import { DashboardComponent } from './dashboard/dashboard.component';


// Users
// import { UsersComponent } from './users/users.component';

const routes: Routes = [
  {
    path : "dashboard",
    component: DashboardComponent
  },
  // {
  //   path : "users",
  //   component: UsersComponent
  // }
	
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
