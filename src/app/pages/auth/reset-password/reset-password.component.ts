import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { HttpserviceService } from 'src/app/shared/service/httpservice.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  submitted: boolean = false;
	token: string = "";
  resetForm = FormGroup;
  fieldTextType : boolean = false;
  fieldTextType1 : boolean = false;
  FormLogin = new FormGroup({
    password: new FormControl('',[Validators.required,Validators.minLength( 8 )])
  });
  
  constructor(
    private router: Router,
	private route: ActivatedRoute,private http:HttpserviceService
  ) { }

  get f() { return this.FormLogin.controls; }

  ngOnInit(): void {
    this.token = this.route.snapshot.params.token;
  }


  toggleFieldTextType(type:string){
    switch (type) {
      case "1":
        this.fieldTextType = !this.fieldTextType;
        break;
        case "2":
          this.fieldTextType1 = !this.fieldTextType1;
        break;
    
    }
    
   }

   onSubmit(){
    this.submitted = true;
    if(this.FormLogin.valid){
      this.http.post( 'reset-pass', this.FormLogin.value ).subscribe( response => {
        this.router.navigate( [ '/pages/message-reset-pass' ] );
			} );
    }
   

   }

}
