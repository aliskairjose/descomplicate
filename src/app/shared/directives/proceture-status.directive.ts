import { Directive, Input, ElementRef, Renderer2 } from '@angular/core';
import { color } from 'html2canvas/dist/types/css/types/color';
import { Status } from '../interfaces/order';

@Directive( {
  selector: '[appProcetureStatus]'
} )
export class ProcetureStatusDirective {

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) { }

  @Input() set appProcetureStatus( status: Status | undefined ) {

    const div = this.el.nativeElement;
    const p = this.renderer.createElement( 'p' );
    const i = this.renderer.createElement( 'i' );

    this.renderer.addClass( i, 'bi' );
    this.renderer.addClass( i, 'bi-circle-fill' );
    this.renderer.addClass( i, 'status-circle' );

    const text = this.renderer.createText( status?.name as string );
    this.renderer.appendChild( p, text );
    this.renderer.appendChild( div, i );
    this.renderer.appendChild( div, p );

    switch ( status?.id ) {
      case 1:
        this.renderer.setStyle( i, 'color', '#fbaa35' );
        break;
      case 2:
        this.renderer.setStyle( i, 'color', '#3ABBD2' );
        break;
      case 3:
        this.renderer.setStyle( i, 'color', 'red' );
        break;
      case 4:
        this.renderer.setStyle( i, 'color', '#FF1744' );
        break;
      case 5:
        this.renderer.setStyle( i, 'color', '#3ABBD2' );
        break;
      case 6:
        this.renderer.setStyle( i, 'color', 'red' );
        break;
      case 7:
        this.renderer.setStyle( i, 'color', '#3abbd2' );
        break;
      default:
        this.renderer.setStyle( i, 'color', '#ff1744' );
        break;
    }

  }

}
