import { Directive, Input, ElementRef, Renderer2 } from '@angular/core';
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
    const text = this.renderer.createText( status?.name as string );
    this.renderer.appendChild( p, text );
    this.renderer.appendChild( div, p );
  }

}
