
import { Component, ElementRef, OnDestroy, OnInit, HostListener, Input } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  @Input() item = ''; // decorate the property with @Input()

  constructor(
 
  ) {
    
  }
  ngOnInit() {
    console.log(this.item);
  }


}
