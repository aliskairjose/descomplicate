import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
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
  constructor(
    private router: Router,
	private route: ActivatedRoute
  ) { }

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
     
    this.router.navigate( [ '/pages/message-reset-pass' ] );
   }

}
