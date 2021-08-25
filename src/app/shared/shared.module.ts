import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MenuComponent } from './components/menu/menu.component';
import { RouterModule } from '@angular/router';
import { ProcetureStatusDirective } from './directives/proceture-status.directive';


@NgModule( {
  declarations: [
    NavbarComponent,
    MenuComponent,
    ProcetureStatusDirective,
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    ProcetureStatusDirective,
    CommonModule,
    NavbarComponent,
    MenuComponent
  ],
  providers: [],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
} )
export class SharedModule { }
