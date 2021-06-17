import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { HttpserviceService } from 'src/app/shared/service/httpservice.service';

@Component({
  selector: 'app-password-recovery',
  templateUrl: './password-recovery.component.html',
  styleUrls: ['./password-recovery.component.scss']
})
export class PasswordRecoveryComponent implements OnInit {
  FormLogin = new FormGroup({
    email: new FormControl('',[Validators.required,Validators.email]),
   
  });
  submitted :boolean = false;
  constructor(private router: Router,private http:HttpserviceService) { }

  ngOnInit(): void {
  }


  onSubmit(): void {
    // console.log("submit");
    this.submitted = true;
    if(this.FormLogin.valid){
      this.http.post( 'password-recovery', this.FormLogin.value ).subscribe( response => {
			  this.router.navigate( [ '/pages/message-pass-recovery' ] );
			} );
    }
   
   
  }

}
