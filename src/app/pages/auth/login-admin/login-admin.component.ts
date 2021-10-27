import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/shared/service/storage.service';
import { AuthService } from 'src/app/shared/service/auth.service';
import { TOKEN, USER } from 'src/app/shared/constants/global-constans';
@Component( {
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: [ './login-admin.component.scss' ]
} )
export class LoginAdminComponent implements OnInit {
  fieldTextType: boolean = false;
  submitted: boolean = false;
  FormLogin = new FormGroup( {
    email: new FormControl( '', [ Validators.required, Validators.email ] ),
    password: new FormControl( '', [ Validators.required, Validators.minLength( 8 ) ] ),
  } );
  constructor(
    private router: Router,
    private auth: AuthService,
    private storage: StorageService,
    private formBuilder: FormBuilder,
  ) {

  }

  get f() { return this.FormLogin.controls; }

  ngOnInit(): void {
  }

  onSubmit() {
    this.submitted = true;
    if ( this.FormLogin.valid ) {
      this.auth.login( 'admin', this.FormLogin.value ).subscribe( response => {
        this.auth.isAuthSubject( true );
        this.auth.userSubject( response.user );
        this.storage.setItem( TOKEN, response.data );
        this.storage.setItem( USER, response.user );
        this.router.navigateByUrl( 'pages/dashboard' );

      } );
    }

  }

}
