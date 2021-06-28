import { Component, OnInit ,Input} from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {
	currentItem = '';
  public url: any;

	constructor( private router: Router ) {
		this.router.events.subscribe( ( event ) => {
			if ( event instanceof NavigationEnd ) {
				this.url = event.url;
			}
		} );
	}

  ngOnInit(): void {
  }

  addItem(status: string) {
    // console.log(status);
	this.currentItem = status;
  }

}
