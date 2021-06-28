import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-message-pass-recovery',
  templateUrl: './message-pass-recovery.component.html',
  styleUrls: ['./message-pass-recovery.component.scss']
})
export class MessagePassRecoveryComponent implements OnInit {
  
  constructor(private router: Router) { }

 

  ngOnInit(): void {
  }

  onSubmit(): void {
   
    this.router.navigate( [ '/pages/reset-password' ] );
  }
}
