import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MenuComponent } from './components/menu/menu.component';



@NgModule({
  declarations: [
    NavbarComponent,
    MenuComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
		CommonModule,
    NavbarComponent,
    MenuComponent
	],
  providers: [],
	schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class SharedModule { }
