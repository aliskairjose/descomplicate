import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-message-reset-pass',
  templateUrl: './message-reset-pass.component.html',
  styleUrls: ['./message-reset-pass.component.scss']
})
export class MessageResetPassComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }


  onSubmit(): void {
   
   
    this.router.navigate( [ '/pages/login' ] );
  }
}
