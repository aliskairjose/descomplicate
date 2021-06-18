import { Component, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @Output() newItemEvent = new EventEmitter<string>();
  status_menu : boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

  addNewItem() {
    let value = "";
 
    if(this.status_menu){
      this.status_menu = ! this.status_menu;
      value = "";
    }else{
      this.status_menu = ! this.status_menu;
      value = "active";
    }
    this.newItemEvent.emit(value);
  }

}
