import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-card-data-approval',
  templateUrl: './card-data-approval.component.html',
  styleUrls: ['./card-data-approval.component.scss']
})
export class CardDataApprovalComponent implements OnInit {
  @Input() data : any; // decorate the property with @Input()
  @Input() pages : any; // decorate the property with @Input()
  constructor() { }

  ngOnInit(): void {
  }

}
