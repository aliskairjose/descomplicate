import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-password-recovery',
  templateUrl: './password-recovery.component.html',
  styleUrls: ['./password-recovery.component.scss']
})
export class PasswordRecoveryComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }


  onSubmit(){
    this.router.navigate(["/message-pass-recovery"]);
  }

}
